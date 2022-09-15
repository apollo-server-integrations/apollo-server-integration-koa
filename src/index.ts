import type { WithRequired } from '@apollo/utils.withrequired';
import type {
  ApolloServer,
  BaseContext,
  ContextFunction,
  HTTPGraphQLRequest,
} from '@apollo/server';
import { parse } from 'url';
import type Koa from 'koa';

export interface KoaContextFunctionArgument {
  ctx: Koa.Context;
}

interface KoaMiddlewareOptions<TContext extends BaseContext> {
  context?: ContextFunction<[KoaContextFunctionArgument], TContext>;
}

export function koaMiddleware(
  server: ApolloServer<BaseContext>,
  options?: KoaMiddlewareOptions<BaseContext>,
): Koa.Middleware;
export function koaMiddleware<TContext extends BaseContext>(
  server: ApolloServer<TContext>,
  options: WithRequired<KoaMiddlewareOptions<TContext>, 'context'>,
): Koa.Middleware;
export function koaMiddleware<TContext extends BaseContext>(
  server: ApolloServer<TContext>,
  options?: KoaMiddlewareOptions<TContext>,
): Koa.Middleware {
  server.assertStarted('koaMiddleware()');

  // This `any` is safe because the overload above shows that context can
  // only be left out if you're using BaseContext as your context, and {} is a
  // valid BaseContext.
  const defaultContext: ContextFunction<
    [KoaContextFunctionArgument],
    any
  > = async () => ({});

  const context: ContextFunction<[KoaContextFunctionArgument], TContext> =
    options?.context ?? defaultContext;

  return async (ctx, next) => {
    if (!ctx.request.body) {
      // The json koa-bodyparser *always* sets ctx.request.body to {} if it's unset (even
      // if the Content-Type doesn't match), so if it isn't set, you probably
      // forgot to set up koa-bodyparser.
      ctx.status = 500;
      ctx.body =
        '`ctx.request.body` is not set; this probably means you forgot to set up the ' +
        '`koa-bodyparser` middleware before the Apollo Server middleware.';
      return;
    }

    const headers = new Map<string, string>();
    for (const [key, value] of Object.entries(ctx.headers)) {
      if (value !== undefined) {
        // Node/Koa headers can be an array or a single value. We join
        // multi-valued headers with `, ` just like the Fetch API's `Headers`
        // does. We assume that keys are already lower-cased (as per the Node
        // docs on IncomingMessage.headers) and so we don't bother to lower-case
        // them or combine across multiple keys that would lower-case to the
        // same value.
        headers.set(
          key,
          Array.isArray(value) ? value.join(', ') : (value as string),
        );
      }
    }

    const httpGraphQLRequest: HTTPGraphQLRequest = {
      method: ctx.method.toUpperCase(),
      headers,
      search: parse(ctx.url).search ?? '',
      body: ctx.request.body,
    };

    try {
      const httpGraphQLResponse = await server.executeHTTPGraphQLRequest({
        httpGraphQLRequest,
        context: () => context({ ctx }),
      });

      if (httpGraphQLResponse.completeBody === null) {
        // TODO(AS4): Implement incremental delivery or improve error handling.
        throw Error('Incremental delivery not implemented');
      }

      for (const [key, value] of httpGraphQLResponse.headers) {
        ctx.set(key, value);
      }

      ctx.status = httpGraphQLResponse.status || 200;
      ctx.body = httpGraphQLResponse.completeBody;
    } catch {
      await next();
    }
  };
}
