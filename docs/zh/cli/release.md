# release

发布工作区的 npm 包并生成 changelogs。

### 使用

```shell
rt release
rt release --skip-npm-publish
rt release --npm-tag beta
rt release --skip-changelog --skip-git-tag
rt release --check-remote-version --remote upstream
```

### 命令行参数

所有选项均可通过命令行参数传递，命令行参数的优先级高于配置文件。

| 参数 | 描述 |
| --- | --- |
| `-t, --npm-tag <tag>` | npm 发布的 dist-tag，如 `beta`、`next` |
| `-r, --remote <remote>` | git push 使用的 remote 名称 |
| `--skip-npm-publish` | 跳过 npm 发布 |
| `--skip-changelog` | 跳过 changelog 生成 |
| `--skip-git-tag` | 跳过 git tag |
| `-c, --check-remote-version` | 发布前检查 npm 远程版本，若版本已存在则退出流程 |

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
