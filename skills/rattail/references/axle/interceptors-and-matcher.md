---
category: Interceptors
---

# Matchers and built-in interceptors

## Matcher

**`matchPattern` / `createMatcher`**: filter which requests an interceptor runs on. Patterns can be:

- exact **URL** string
- **`method:get`**-style prefix
- **`status:404`** for response phase
- or a custom predicate `( { url, method, status? } ) => boolean`

**`createMatcher(include?, exclude?)`**: include/exclude lists; exclude wins.

## Documentation

- [README — Built-in interceptor](https://github.com/varletjs/axle/blob/main/packages/axle/README.md#L208-L279)
- [Source — `matcher.ts`](https://github.com/varletjs/axle/blob/main/packages/axle/src/matcher.ts)
- [Source — `interceptors/`](https://github.com/varletjs/axle/tree/main/packages/axle/src/interceptors)

## Built-in interceptors (from package root)

Exported from `rattail/axle`, including (names may vary by version):

- Request: `requestHeadersInterceptor`, `requestMockInterceptor`, `requestMd5Interceptor`
- Response: `responseBlobInterceptor`, `responseTimeoutInterceptor`, `responseRetryInterceptor`, `responseStatusInterceptor`

Each factory typically accepts options with **`include` / `exclude`** matcher arrays (see README “General parameter of the interceptor”).
