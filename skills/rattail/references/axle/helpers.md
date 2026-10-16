---
category: Utils
---

# Helpers: `withResponse` and `download`

## Documentation

- [Utilities](https://axle.varletjs.org/guide/utilities)
- [Source — `helper.ts`](https://github.com/varletjs/axle/blob/main/src/helper.ts)

## `withResponse`

Wraps a promise so it **never rejects** on axios errors: resolves with `{ response, errorResponse }` (either side populated). Non-axios errors still reject.

## `download`

Browser-only: triggers a file download for a URL or `Blob` (`inBrowser` guard).
