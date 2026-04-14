---
category: Utils
---

# Helpers: `withResponse` and `download`

## Documentation

- [README — Utils](https://github.com/varletjs/axle/blob/main/packages/axle/README.md#L182-L206)
- [Source — `helper.ts`](https://github.com/varletjs/axle/blob/main/packages/axle/src/helper.ts)

## `withResponse`

Wraps a promise so it **never rejects** on axios errors: resolves with `{ response, errorResponse }` (either side populated). Non-axios errors still reject.

## `download`

Browser-only: triggers a file download for a URL or `Blob` (`inBrowser` guard).
