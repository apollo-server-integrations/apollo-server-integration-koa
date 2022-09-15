# `@greenside/apollo-server-integration-koa`

## A TypeScript/JavaScript GraphQL middleware for `@apollo/server`

## Getting started: Koa middleware

Apollo Server enables the ability to add middleware that lets you run your GraphQL server as part of an app built with Koa, one of the most popular web frameworks for Node.

First, install Apollo Server, the JavaScript implementation of the core GraphQL algorithms, Koa, and two common Koa middleware packages:

```
npm install @apollo/server graphql koa @koa/cors koa-bodyparser
```

Then, write the following to server.mjs. (By using the .mjs extension, Node lets you use the await keyword at the top level.)

```js
const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const { ApolloServer } = require('@apollo/server');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const { koaMiddleware } = require('@greenside/apollo-server-integration-koa');

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

async function startApolloServer() {
  const app = new Koa();
  const httpServer = http.createServer(app.callback());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(cors());
  app.use(bodyParser());
  app.use(
    koaMiddleware(server, {
      context: async ({ ctx }) => ({ token: ctx.headers.token }),
    })
  );
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000`);
}

startApolloServer();
```

Now run your server with:

```
node server.js
```

Open the URL it prints in a web browser. It will show Apollo Sandbox, a web-based tool for running GraphQL operations. Try running the operation `query { hello }`!