# changelog

生成 changelog。

### 使用

```shell
rt changelog
```

### 配置

此配置仅影响 `rt changelog` 命令，不会影响 `rt release` 中的 changelog 流程。

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
| `releaseCount` | `number` | `0` | 生成的发布版本数量，`0` 表示全量生成 |
| `showTypes` | `string[]` | `[feat, fix, perf, revert, refactor]` | 自定义在 `CHANGELOG.md` 中显示哪些类型的提交消息。例如，传入 `[feat, fix]` 将仅生成 `Features` 和 ` Bug Fixes` 类型的提交信息。可从从以下类型中自由组合：`['feat', 'fix', 'perf', 'revert', 'refactor', 'docs', 'style', 'test', 'build', 'ci']`。 |
