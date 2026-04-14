# api

Parse OpenAPI/Swagger schema to generate API modules. Recommended to use with [Axle](/axle/getting-started) to generate type-safe API call methods directly from the schema.

### Usage

```shell
rt api
```

### Config

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    api: {
      input: './openapi.json',
      output: './src/apis/generated',
      preset: 'axle',
      ts: true,
    },
  },
})
```

### Programmatic Usage

```ts
import { api } from 'rattail/cli'

await api({
  input: './openapi.json',
  output: './src/apis/generated',
  preset: 'axle',
  ts: true,
})
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `input` | `string` | `'./schema.json'` | Path to OpenAPI/Swagger schema |
| `output` | `string` | `'./src/apis/generated'` | Output directory |
| `base` | `string` | - | Base path of API endpoints |
| `ts` | `boolean` | `true` | Generate TypeScript code |
| `typesOnly` | `boolean` | `false` | Generate only types |
| `preset` | `'axle' \| 'axios'` | `'axle'` | Template preset |
| `overrides` | `boolean \| string[]` | `true` | Override existing files |
| `clean` | `boolean` | `false` | Clean output directory before generating |
| `excludeDeprecated` | `boolean` | `false` | Exclude deprecated endpoints |
