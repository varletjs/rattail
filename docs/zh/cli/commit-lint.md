# commit-lint

校验 commit 信息。通常配合 `commit-msg` git hook 使用。

### 使用

```shell
rt commit-lint -p $1
```

### 配置

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    hook: {
      'commit-msg': ['rt commit-lint -p $1'],
    },
  },
})
```

### 编程式使用

```ts
import { commitLint } from 'rattail/cli'

commitLint({ commitMessagePath: '.git/COMMIT_EDITMSG' })
```

### 选项

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `commitMessagePath` | `string` | - | Git commit 信息文件路径 |
| `commitMessageRe` | `string \| RegExp` | - | 自定义 commit 信息正则表达式 |
| `errorMessage` | `string` | - | 自定义错误信息 |
| `warningMessage` | `string` | - | 自定义警告信息 |
