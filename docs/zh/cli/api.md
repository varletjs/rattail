# api

解析 OpenAPI/Swagger schema 生成 API 模块。推荐配合 [Axle](/zh/axle/getting-started) 使用，直接从 schema 生成类型安全的 API 调用方法。

### 使用

```shell
rt api
```

### 配置

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

### 编程式使用

```ts
import { api } from 'rattail/cli'

await api({
  input: './openapi.json',
  output: './src/apis/generated',
  preset: 'axle',
  ts: true,
})
```

### 选项

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `input` | `string` | `'./schema.json'` | OpenAPI/Swagger schema 文件路径 |
| `output` | `string` | `'./src/apis/generated'` | 输出目录 |
| `base` | `string` | - | API 端点的基础路径 |
| `ts` | `boolean` | `true` | 生成 TypeScript 代码 |
| `typesOnly` | `boolean` | `false` | 仅生成类型 |
| `preset` | `'axle' \| 'axios'` | `'axle'` | 模板预设 |
| `overrides` | `boolean \| string[]` | `true` | 覆盖已有文件 |
| `clean` | `boolean` | `false` | 生成前清空输出目录 |
| `excludeDeprecated` | `boolean` | `false` | 排除已废弃的端点 |
