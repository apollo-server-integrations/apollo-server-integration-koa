---
'@as-integrations/koa': minor
---

Implement support for the @defer directive. In order to use this feature, you must be using an appropriate version of `graphql`. At the time of writing this, @defer is only available in v17 alpha versions of the `graphql` package, which is currently not officially supported. Due to peer dependencies, you must install graphql like so in order to force v17:
`npm i graphql@alpha --legacy-peer-deps`
