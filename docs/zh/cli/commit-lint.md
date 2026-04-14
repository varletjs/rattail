# commit-lint

校验 commit 信息是否符合规范，在提交代码时自动拦截不规范的 commit，保持团队提交记录清晰一致。

### 规则

commit 信息需要遵循 `type(scope?): message` 格式：

```
feat: 添加新功能
feat(ui/button): 在 ui/button 范围内添加新功能

fix: 修复一个 bug
fix(ui/button): 修复 ui/button 范围内的一个 bug
```

支持的 type：

`fix` `feat` `docs` `perf` `test` `types` `style` `build` `chore` `release` `refactor` `revert` `merge` `wip`

### 使用

```shell
rt commit-lint $1
```

### 配置

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    hook: {
      'commit-msg': ['rt commit-lint $1'],
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
