# clean

清理文件和目录。

### 使用

```shell
rt clean dist node_modules/.cache "src/**/*.log"
```

如果未提供模式，命令将从 `rattail.clean` 配置中读取。

### 配置

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    // string | string[] | { patterns: string[] }
    clean: ['dist', 'node_modules/.cache', 'src/**/*.log'],
  },
})
```

### 编程式使用

```ts
import { clean } from 'rattail/cli'

await clean(['dist', 'node_modules/.cache', 'src/**/*.log'])
```
