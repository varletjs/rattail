# release

交互式发布包。

### 使用

```shell
rt release
```

### 配置

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    release: {
      // skipNpmPublish: true,
      // skipChangelog: true,
    },
  },
})
```

### 编程式使用

```ts
import { release } from 'rattail/cli'

await release({
  // skipNpmPublish: true,
  // skipChangelog: true,
})
```

### 选项

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `npmTag` | `string` | - | npm 发布的 dist-tag，如 `beta`、`next`，不设置则默认为 `latest` |
| `skipNpmPublish` | `boolean` | - | 跳过 npm 发布 |
| `skipChangelog` | `boolean` | - | 跳过 changelog 生成 |
| `skipGitTag` | `boolean` | - | 跳过 git tag |
| `checkRemoteVersion` | `boolean` | - | 发布前检查 npm 远程版本，若版本已存在则跳过发布 |
| `task` | `(newVersion, oldVersion) => Promise<void>` | - | 在版本号更新之后、npm 发布之前运行的自定义任务，如执行构建 |
| `remote` | `string` | `origin` | git push 使用的 remote 名称，多数情况下无需修改 |
