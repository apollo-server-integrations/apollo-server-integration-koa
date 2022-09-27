import http from 'http';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { ApolloServer, ApolloServerOptions, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  defineIntegrationTestSuite,
  CreateServerForIntegrationTestsOptions,
} from '@apollo/server-integration-testsuite';
import { koaMiddleware } from '..';
import { urlForHttpServer } from '../utils';

defineIntegrationTestSuite(
  async function (
    serverOptions: ApolloServerOptions<BaseContext>,
    testOptions?: CreateServerForIntegrationTestsOptions,
  ) {
    const app = new Koa();
    // disable logs to console.error
    app.silent = true;

    const httpServer = http.createServer(app.callback());
    const server = new ApolloServer({
      ...serverOptions,
      plugins: [
        ...(serverOptions.plugins ?? []),
        ApolloServerPluginDrainHttpServer({
          httpServer,
        }),
      ],
    });

    await server.start();
    app.use(cors());
    app.use(bodyParser());
    app.use(
      koaMiddleware(server, {
        context: testOptions?.context,
      }),
    );
    await new Promise<void>((resolve) => {
      httpServer.listen({ port: 0 }, resolve);
    });
    return { server, url: urlForHttpServer(httpServer) };
  },
  { noIncrementalDelivery: true },
);
