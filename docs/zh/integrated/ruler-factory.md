# ruler-factory

一个灵活、可链式调用的 TypeScript/JavaScript 校验规则工厂，集成自 [ruler-factory](https://github.com/varletjs/ruler-factory)。

### 特性

- 链式 API，可构建复杂校验规则
- 支持 string、number、array、boolean、object、symbol、bigint、null、undefined
- 可自定义错误信息
- 易于扩展与集成
- 支持 TypeScript

### 与 UI 框架集成

#### Varlet UI

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { rulerFactory } from 'rattail/ruler-factory'

const r = rulerFactory((validator) => {
  return (value) => {
    const e = validator(value)
    return e ? e.message : true
  }
})

const model = ref({
  name: '',
  email: '',
})
</script>

<template>
  <var-form>
    <var-input v-model="model.name" placeholder="姓名" :rules="r().required('必填').min(2, '长度不正确').done()" />
    <var-input v-model="model.age" placeholder="邮箱" :rules="r().email('必须是邮箱格式').done()" />
  </var-form>
</template>
```

#### Vant

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { rulerFactory } from 'rattail/ruler-factory'
import type { FieldRule } from 'vant'

const r = rulerFactory<FieldRule>((validator, params) => ({
  validator(value) {
    const e = validator(value)

    return e ? e.message : true
  },
  trigger: ['onChange', 'onBlur', 'onSubmit'],
  ...params,
}))

const model = ref({
  name: '',
  email: '',
})
</script>

<template>
  <van-form>
    <van-cell-group inset>
      <van-field v-model="model.name" label="姓名" placeholder="姓名" :rules="r().required('必填').done()" />
      <van-field v-model="model.email" label="邮箱" placeholder="邮箱" :rules="r().email('必须是邮箱格式').done()" />
    </van-cell-group>
  </van-form>
</template>
```

#### Naive UI

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { FormItemRule } from 'naive-ui'
import { rulerFactory } from 'rattail/ruler-factory'

const r = rulerFactory<FormItemRule>((validator, params = {}) => ({
  trigger: ['blur', 'change', 'input'],
  validator: (_, value) => validator(value),
  ...params,
}))

const model = ref({
  name: '',
  age: 20,
})
</script>

<template>
  <n-form :model>
    <n-form-item path="name" label="姓名" :rule="r().required('必填').min(2, '长度不正确').done()">
      <n-input v-model:value="model.name" />
    </n-form-item>
    <n-form-item path="age" label="年龄" :rule="r().number().required('必填').negative('必须为负数').done()">
      <n-input-number v-model:value="model.age" />
    </n-form-item>
  </n-form>
</template>
```

#### Element Plus

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { FormItemRule } from 'element-plus'
import { rulerFactory } from 'rattail/ruler-factory'

const r = rulerFactory<FormItemRule>((validator, params) => ({
  validator(_, value, callback) {
    const e = validator(value)

    e ? callback(e) : callback()
  },
  trigger: ['blur', 'change', 'input'],
  ...params,
}))

const model = ref({
  name: '',
  email: '',
})
</script>

<template>
  <el-form :model>
    <el-form-item prop="name" label="姓名" :rules="r().required('必填').done()">
      <el-input v-model="model.name" />
    </el-form-item>
    <el-form-item prop="email" label="邮箱" :rules="r().email('必须是邮箱格式').done()">
      <el-input v-model="model.email" />
    </el-form-item>
  </el-form>
</template>
```

#### 扩展 API

以 Naive UI 为例

```ts
import { FormItemRule } from 'naive-ui'
import { RulerContext, rulerFactory, RulerFactoryMessage } from 'rattail/ruler-factory'

interface RulerExtendedContext {
  ip(message: RulerFactoryMessage, params?: FormItemRule): RulerContext<FormItemRule, FormItemRule, this>
}

const r = rulerFactory<FormItemRule, FormItemRule, RulerExtendedContext>(
  (validator, params = {}) => ({
    trigger: ['blur', 'change', 'input'],
    validator: (_, value) => validator(value),
    ...params,
  }),
  (ctx) => {
    function ip(message: RulerFactoryMessage, params?: FormItemRule) {
      ctx.addRule((value) => {
        // 自行实现 isString 和 isIP
        if (!isString(value) || !isIP(value)) {
          return new Error(ctx.getMessage(message))
        }
      }, params)

      return ctx
    }

    return { ip }
  },
)

r().ip('IP 格式错误').done()
```

### API

#### 类型校验

- `.string(message?, params?)`
- `.number(message?, params?)`
- `.array(message?, params?)`
- `.boolean(message?, params?)`
- `.object(message?, params?)`
- `.symbol(message?, params?)`
- `.bigint(message?, params?)`
- `.null(message?, params?)`
- `.undefined(message?, params?)`
- `.true(message?, params?)`
- `.false(message?, params?)`

#### 非空校验

- `.required(message)`

#### 字符串校验

- `.min(value, message, params?)`
- `.max(value, message, params?)`
- `.length(value, message, params?)`
- `.regex(regexp, message, params?)`
- `.startsWith(value, message, params?)`
- `.endsWith(value, message, params?)`
- `.includes(value, message, params?)`
- `.uppercase(message, params?)`
- `.lowercase(message, params?)`
- `.email(message, params?)`

#### 数字校验

- `.number().min(value, message, params?)`
- `.number().max(value, message, params?)`
- `.number().gt(value, message, params?)`
- `.number().gte(value, message, params?)` 别名 .min
- `.number().lt(value, message, params?)`
- `.number().lte(value, message, params?)` 别名 .max
- `.number().positive(value, message, params?)`
- `.number().negative(value, message, params?)`

#### Bigint 校验

- `.bigint().min(value, message, params?)`
- `.bigint().max(value, message, params?)`
- `.bigint().gt(value, message, params?)`
- `.bigint().gte(value, message, params?)` 别名 .min
- `.bigint().lt(value, message, params?)`
- `.bigint().lte(value, message, params?)` 别名 .max
- `.bigint().positive(value, message, params?)`
- `.bigint().negative(value, message, params?)`

#### 数组校验

- `.array().min(value, message, params?)`
- `.array().max(value, message, params?)`
- `.array().length(value, message, params?)`
- `.array().includes(value, message, params?)`

#### 谓词校验

- `.is(fn, message, params?)`
- `.not(fn, message, params?)`

#### 完成规则构建

- `.done()`

#### 自定义规则

- `.addRule(validator)`

#### 值转换

- `.trim()`
- `.toLowerCase()`
- `.toUpperCase()`
- `.transform(fn)`

### 参考

[ruler-factory](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md)
