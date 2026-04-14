---
category: Core
---

# Request runners

Runners are functions `(url, params?, config?) => Promise<R>`. **Fetch** methods (`get`, `head`, `options`, `delete`) pass `params` as axios **`params`** (query). **Modify** methods (`post`, `put`, `patch`) send a body; variants choose encoding:

| Pattern                            | Meaning                                         |
| ---------------------------------- | ----------------------------------------------- |
| `get`, `post`, …                   | Default `responseType` / JSON body              |
| `getBlob`, `postMultipart`, …      | Suffix selects `responseType` or `Content-Type` |
| `postUrlEncode`, `putUrlEncode`, … | `application/x-www-form-urlencoded`             |
| `postMultipart`, …                 | `multipart/form-data`                           |

## Documentation

- [README — Axle & Axios Request Functions](https://github.com/varletjs/axle/blob/main/packages/axle/README.md#L78-L180)
- [Source — `createFetchRunner` / `createModifyRunner`](https://github.com/varletjs/axle/blob/main/packages/axle/src/instance.ts#L114-L155)

## Example (README-style)

```js
axle.get('/url', { a: 1 }, { headers: {} })
axle.post('/url', { name: 'Axle' }, { headers: {} })
axle.postUrlEncode('/url', { a: 1, b: 2 })
axle.postMultipart('/url', { file: new File([], 'a.txt') })
```
