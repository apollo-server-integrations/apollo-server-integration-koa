---
'@as-integrations/koa': patch
---

Parameterize `KoaContextFunctionArgument` and `KoaMiddlewareOptions` so that the `ctx` parameter in the `context` function is correctly typed when this library is used along with a context-parameterized Koa app.
