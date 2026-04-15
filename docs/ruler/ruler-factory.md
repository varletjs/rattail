# ruler

A flexible, chainable validation rule factory for TypeScript/JavaScript.

### Features

- Chainable API for building complex validation rules
- Supports string, number, array, boolean, object, symbol, bigint, null, undefined
- Customizable error messages
- Easy to extend and integrate
- TypeScript support

### Integration with UI frameworks

#### Varlet UI

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { rulerFactory } from 'rattail/ruler'

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
    <var-input
      v-model="model.name"
      placeholder="Name"
      :rules="r().required('Required').min(2, 'Wrong length').done()"
    />
    <var-input
      v-model="model.age"
      placeholder="Email"
      :rules="r().email('Must be email format').done()"
    />
  </var-form>
</template>
```

#### Vant

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { rulerFactory } from 'rattail/ruler'
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
      <van-field
        v-model="model.name"
        label="Name"
        placeholder="Name"
        :rules="r().required('Required').done()"
      />
      <van-field
        v-model="model.email"
        label="Email"
        placeholder="Email"
        :rules="r().email('Must be email format').done()"
      />
    </van-cell-group>
  </van-form>
</template>
```

#### Naive UI

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { FormItemRule } from 'naive-ui'
import { rulerFactory } from 'rattail/ruler'

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
    <n-form-item
      path="name"
      label="Name"
      :rule="r().required('Required').min(2, 'Wrong length').done()"
    >
      <n-input v-model:value="model.name" />
    </n-form-item>
    <n-form-item
      path="age"
      label="Age"
      :rule="r().number().required('Required').negative('Must be negative').done()"
    >
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
import { rulerFactory } from 'rattail/ruler'

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
    <el-form-item prop="name" label="Name" :rules="r().required('Required').done()">
      <el-input v-model="model.name" />
    </el-form-item>
    <el-form-item
      prop="email"
      label="Email"
      :rules="r().email('Must be email format').done()"
    >
      <el-input v-model="model.email" />
    </el-form-item>
  </el-form>
</template>
```

#### Extend API

Take Naive UI as an example

```ts
import { FormItemRule } from 'naive-ui'
import {
  RulerContext,
  rulerFactory,
  RulerFactoryMessage,
} from 'rattail/ruler'

interface RulerExtendedContext {
  ip(
    message: RulerFactoryMessage,
    params?: FormItemRule,
  ): RulerContext<FormItemRule, FormItemRule, this>
}

const r = rulerFactory<
  FormItemRule,
  FormItemRule,
  RulerExtendedContext
>(
  (validator, params = {}) => ({
    trigger: ['blur', 'change', 'input'],
    validator: (_, value) => validator(value),
    ...params,
  }),
  (ctx) => {
    function ip(message: RulerFactoryMessage, params?: FormItemRule) {
      ctx.addRule((value) => {
        // Implement isString and isIP by yourself
        if (!isString(value) || !isIP(value)) {
          return new Error(ctx.getMessage(message))
        }
      }, params)

      return ctx
    }

    return { ip }
  },
)

r().ip('ip format error').done()
```

### API

#### Types Validation

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

#### Non Empty Validation

- `.required(message)`

#### String Validation

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

#### Number Validation

- `.number().min(value, message, params?)`
- `.number().max(value, message, params?)`
- `.number().gt(value, message, params?)`
- `.number().gte(value, message, params?)` alias .min
- `.number().lt(value, message, params?)`
- `.number().lte(value, message, params?)` alias .max
- `.number().positive(value, message, params?)`
- `.number().negative(value, message, params?)`

#### Bigint Validation

- `.bigint().min(value, message, params?)`
- `.bigint().max(value, message, params?)`
- `.bigint().gt(value, message, params?)`
- `.bigint().gte(value, message, params?)` alias .min
- `.bigint().lt(value, message, params?)`
- `.bigint().lte(value, message, params?)` alias .max
- `.bigint().positive(value, message, params?)`
- `.bigint().negative(value, message, params?)`

#### Array Validation

- `.array().min(value, message, params?)`
- `.array().max(value, message, params?)`
- `.array().length(value, message, params?)`
- `.array().includes(value, message, params?)`

#### Predicate Validation

- `.is(fn, message, params?)`
- `.not(fn, message, params?)`

#### Complete rule building

- `.done()`

#### Custom Rule

- `.addRule(validator)`

#### Value Transformer

- `.trim()`
- `.toLowerCase()`
- `.toUpperCase()`
- `.transform(fn)`

