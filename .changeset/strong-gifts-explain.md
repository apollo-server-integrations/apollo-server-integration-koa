---
'@as-integrations/koa': minor
---

Parameterize the returned Middleware type so that this library can be used along with a context-parameterized Koa app.

In order to utilize this feature, provide your Koa app's `State` and `Context` types as type arguments to the `koaMiddleware` function.

If you use a `context` function (for Apollo Server), the `State` and `Context` types are positions 1 and 2 like so:

```ts
type KoaState = { state: object };
type KoaContext = { context: object };

koaMiddleware<GraphQLContext, KoaState, KoaContext>(
  new ApolloServer<GraphQLContext>(),
  //...
  {
    context: async ({ ctx }) => ({ graphqlContext: {} }),
  },
);
```

If you don't use a `context` function, the `State` and `Context` types are positions 0 and 1 like so:

```ts
type KoaState = { state: object };
type KoaContext = { context: object };

koaMiddleware<KoaState, KoaContext>(
  new ApolloServer<GraphQLContext>(),
  //...
);
```
