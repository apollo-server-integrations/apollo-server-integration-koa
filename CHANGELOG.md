# CHANGELOG

## 1.0.0

### Major Changes

- [#117](https://github.com/apollo-server-integrations/apollo-server-integration-koa/pull/117) [`4567c98`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/4567c982adeaa4a201ec133f1d7afa77eddb3b93) Thanks [@trevor-scheer](https://github.com/trevor-scheer)! - Drop support for Node.js 14, require v16+

  The only change required for users to take this update is to upgrade their Node.js version to v16+. No other breaking changes.

## 0.3.0

### Minor Changes

- [#85](https://github.com/apollo-server-integrations/apollo-server-integration-koa/pull/85) [`bb28b66`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/bb28b66c60151289e4fee51ce58443b000e06056) Thanks [@laverdet](https://github.com/laverdet)! - Implement support for the @defer directive. In order to use this feature, you must be using an appropriate version of `graphql`. At the time of writing this, @defer is only available in v17 alpha versions of the `graphql` package, which is currently not officially supported. Due to peer dependencies, you must install graphql like so in order to force v17:
  `npm i graphql@alpha --legacy-peer-deps`

## 0.2.1

### Patch Changes

- [#43](https://github.com/apollo-server-integrations/apollo-server-integration-koa/pull/43) [`997b160`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/997b160c888f970b3f39abdfd01fb95f83d3fa57) Thanks [@trevor-scheer](https://github.com/trevor-scheer)! - Remove effectful install

## 0.2.0

### Minor Changes

- [#26](https://github.com/apollo-server-integrations/apollo-server-integration-koa/pull/26) [`a284fe2`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/a284fe2bab5da9fad13d8cf5d4cb5a011443fe15) Thanks [@renovate](https://github.com/apps/renovate)! - Officially support Apollo Server v4.0.0

## 0.1.0

### Minor Changes

- [#19](https://github.com/apollo-server-integrations/apollo-server-integration-koa/pull/19) [`61106d1`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/61106d1ed4f7a0e3f94feb117ed69c4ca86efe5d) Thanks [@matthew-gordon](https://github.com/matthew-gordon)! - Update Apollo Server dependencies, add explicit non-support for incremental delivery for now"

## 0.0.12

### Patch Changes

- [#17](https://github.com/apollo-server-integrations/apollo-server-integration-koa/pull/17) [`0aef5c3`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/0aef5c3d83d9f9495a785b350712c4703b9257b4) Thanks [@matthew-gordon](https://github.com/matthew-gordon)! - Update repository docs/ownership

## 0.0.11

### Patch Changes

- [#15](https://github.com/apollo-server-integrations/apollo-server-integration-koa/pull/15) [`a192085`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/a1920855fecd5a0bb1afc0961a86123c960e0508) Thanks [@matthew-gordon](https://github.com/matthew-gordon)! - Update keywords

## 0.0.10

### Patch Changes

- [`7b90754`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/7b9075459e4937be136a841793a279abf826dbbe) Thanks [@matthew-gordon](https://github.com/matthew-gordon)! - Update docs

## 0.0.9

### Patch Changes

- [#10](https://github.com/apollo-server-integrations/apollo-server-integration-koa/pull/10) [`ab78fd4`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/ab78fd42d99d4ba1d52975f718c9fb292a85008a) Thanks [@matthew-gordon](https://github.com/matthew-gordon)! - Update deprecated call

## 0.0.8

### Patch Changes

- [#8](https://github.com/apollo-server-integrations/apollo-server-integration-koa/pull/8) [`51fcd01`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/51fcd01923b785d1dd707a994c705f645e20efaf) Thanks [@matthew-gordon](https://github.com/matthew-gordon)! - Update build scripts for better DX

## 0.0.7

### Patch Changes

- [`69ac68f`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/69ac68f4d86be8a1c629ac777c1f13509cccd7a4) Thanks [@matthew-gordon](https://github.com/matthew-gordon)! - Update LICENSE

## 0.0.6

### Patch Changes

- [`734f7c7`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/734f7c7a2e1bd9aa850294f44f8c504baaea15e2) Thanks [@matthew-gordon](https://github.com/matthew-gordon)! - small cleanup

- [`734f7c7`](https://github.com/apollo-server-integrations/apollo-server-integration-koa/commit/734f7c7a2e1bd9aa850294f44f8c504baaea15e2) Thanks [@matthew-gordon](https://github.com/matthew-gordon)! - small cleanup
