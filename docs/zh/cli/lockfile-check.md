# lockfile-check

检查 lockfile 是否更新。

支持检测的 lockfile：

- `pnpm-lock.yaml`
- `yarn.lock`
- `package-lock.json`

### 使用

```shell
rt lockfile-check
```

### 配置

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    hook: {
      'post-merge': ['rt lockfile-check'],
    },
  },
})
```

### 编程式使用

```ts
import { lockfileCheck } from 'rattail/cli'

await lockfileCheck({ packageManager: 'pnpm' })
```

### 选项

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `packageManager` | `'npm' \| 'yarn' \| 'pnpm'` | `'pnpm'` | 包管理器 |
| `skipInstall` | `boolean` | `false` | 跳过 lockfile 变更时的自动安装 |
