# changelog

单独生成 changelog。此配置仅影响 `rt changelog` 命令，不会影响 `rt release` 中的 changelog 流程。

### 使用

```shell
rt changelog
```

### 配置

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    changelog: {
      // releaseCount: 3,
      // file: './CHANGELOG.md',
    },
  },
})
```

### 编程式使用

```ts
import { changelog } from 'rattail/cli'

await changelog({
  // releaseCount: 3,
  // file: './CHANGELOG.md',
})
```

### 选项

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `file` | `string` | - | 输出文件路径 |
| `releaseCount` | `number` | - | 显示的发布版本数量 |
| `showTypes` | `string[]` | - | 包含的 commit 类型 (如 `'feat'`、`'fix'`、`'perf'`) |
