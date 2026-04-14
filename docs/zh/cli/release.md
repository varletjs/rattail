# release

发布所有包并生成 changelogs。

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
| `remote` | `string` | - | Git 远程仓库名称 |
| `npmTag` | `string` | - | npm 发布标签 |
| `skipNpmPublish` | `boolean` | - | 跳过 npm 发布 |
| `skipChangelog` | `boolean` | - | 跳过 changelog 生成 |
| `skipGitTag` | `boolean` | - | 跳过 git 标签 |
| `checkRemoteVersion` | `boolean` | - | 发布前检查远程版本 |
| `task` | `(newVersion, oldVersion) => Promise<void>` | - | 发布过程中运行的自定义任务 |
