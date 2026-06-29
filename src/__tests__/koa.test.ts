import { ApolloServer } from '@apollo/server';
import koa from 'koa';
import request from 'supertest';
import { it, expect } from '@jest/globals';
import { bodyParser } from '@koa/bodyparser';
import { koaMiddleware } from '..';

it('gives helpful error if body-parser middleware is not installed', async () => {
  const server = new ApolloServer({ typeDefs: 'type Query {f: ID}' });
  await server.start();
  const app = new koa();

  // Note lack of `bodyParser` here.
  app.use(koaMiddleware(server));

  await request(app.callback())
    .post('/')
    .send({ query: '{hello}' })
    .expect(500, /forgot to set up the `@koa\/bodyparser`/);
  await server.stop();
});

it('not calling start causes a clear error', async () => {
  const server = new ApolloServer({ typeDefs: 'type Query {f: ID}' });
  expect(() => koaMiddleware(server)).toThrow(
    'You must `await server.start()`',
  );
});

it('calls middlewares defined after koaMiddleware', async () => {
  const server = new ApolloServer({ typeDefs: 'type Query {f: ID}' });
  const app = new koa();
  const spy = jest.fn();

  await server.start();

  app.use(bodyParser());
  app.use(koaMiddleware(server));
  app.use((_, next) => {
    spy();
    return next();
  });

  await request(app.callback()).post('/').send({ query: '{f}' }).expect(200);
  expect(spy).toHaveBeenCalled();
  await server.stop();
});
