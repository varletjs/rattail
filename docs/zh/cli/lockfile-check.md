# lockfile-check

检查 lockfile 是否更新，并可选择自动安装依赖。通常配合 `post-merge` git hook 使用。

### 使用

```shell
rt lockfile-check -m pnpm -i
```

### 配置

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    hook: {
      'post-merge': ['rt lockfile-check -i'],
    },
  },
})
```

### 编程式使用

```ts
import { lockfileCheck } from 'rattail/cli'

await lockfileCheck({ packageManager: 'pnpm', install: true })
```

### 选项

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `packageManager` | `'npm' \| 'yarn' \| 'pnpm'` | - | 包管理器 |
| `install` | `boolean` | - | lockfile 变更时自动安装依赖 |
