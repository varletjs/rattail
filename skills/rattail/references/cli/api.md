---
category: CLI
---

# `rt api`

Generate TypeScript/JavaScript API modules from OpenAPI 3 / Swagger 2 schemas. Powered by [`api-farmer`](https://github.com/varletjs/api-farmer).

## Source

- [src/cli/api.ts](https://github.com/varletjs/rattail/blob/main/src/cli/api.ts)

## Usage

```bash
rt api
```

This replaces the standalone `af` (api-farmer) CLI. The command reads configuration from `rattail.api` in `vite.config.ts`.

## Configuration

In `vite.config.ts`:

```ts
export default defineConfig({
  rattail: {
    api: {
      input: './schema.yaml',
      output: './src/apis/generated',
      preset: 'axle',
    },
  },
})
```

## Options (`GenerateOptions` from `api-farmer`)

| Field              | Purpose                                                                         | Default                         |
| ------------------ | ------------------------------------------------------------------------------- | ------------------------------- |
| `input`            | Path to OpenAPI 3 / Swagger 2, or `http(s)` URL for remote fetch                | `./schema.json`                 |
| `output`           | Output directory                                                                | `./src/apis/generated`          |
| `base`             | Common prefix stripped from `paths` keys                                        | none                            |
| `typesFilename`    | Aggregated types filename                                                       | `_types.ts`                     |
| `ts`               | Emit TypeScript (including types file)                                          | `true`                          |
| `typesOnly`        | Types only; skip module files                                                   | `false`                         |
| `overrides`        | `true` overwrite existing files; `string[]` overwrites only listed module names | `true`                          |
| `preset`           | Built-in EJS: `axle` \| `axios`                                                 | `axle`                          |
| `validateStatus`   | Which HTTP statuses contribute to response body typing                          | `status >= 200 && status < 300` |
| `transformer`      | Override naming / comments / type path hooks                                    | `{}`                            |
| `uncountableNouns` | Words that skip singular/plural rules for `transformEntity`                     | `[]`                            |
| `openapiTsOptions` | Passed through to [`openapi-typescript`](https://openapi-ts.dev/node)           | `{}`                            |

## `transformer` hooks

Optional overrides on `api.transformer`: `moduleName`, `verb`, `url`, `entity`, `fn`, `comment`, `type`, `typeValue`, `typeQuery`, `typeQueryValue`, `typeRequestBody`, `typeRequestBodyValue`, `typeResponseBody`, `typeResponseBodyValue`. Each receives OpenAPI operation context and returns the string used in templates.

## Custom EJS templates

If **`api-farmer.ejs`** exists at the project root, it fully replaces the built-in template for the current `preset`. Copy structure from the upstream preset sources (`templates/axle.ejs` or `templates/axios.ejs`) when customizing.

### Template data (`ApiModuleTemplateData`)

| Field           | Meaning                                  |
| --------------- | ---------------------------------------- |
| `apiModule`     | Current module: `name` + `payloads[]`    |
| `typesFilename` | Types aggregate basename (without `.ts`) |
| `ts`            | Whether output is TypeScript             |
| `typesOnly`     | Types-only mode                          |

### Per operation (`ApiModulePayload`)

Common fields: `comment`, `fn`, `url`, `method`, `verb`, `entity`, `requestContentType`, `type` / `typeValue`, `typeQuery` / `typeQueryValue`, `typeRequestBody` / `typeRequestBodyValue`, `typeResponseBody` / `typeResponseBodyValue`.

## Programmatic

```ts
import { api } from 'rattail/cli'

await api({
  input: './schema.yaml',
  output: './src/apis/generated',
  preset: 'axle',
})
await api() // reads from config
```

## Official docs

- [api-farmer README](https://github.com/varletjs/api-farmer/blob/main/README.md)
