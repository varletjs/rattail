---
name: rattail
description: >-
  Guides use of the rattail front-end toolchain: utilities (array, object,
  string, math, DOM, file, function, collection, integrated), CLI (rt: clean,
  api, hook, release, changelog, commit-lint, lockfile-check), axle HTTP client
  (rattail/axle), ruler-factory validation (rattail/ruler-factory), and
  vite-plus lint/fmt configuration (rattail/vite-plus).
license: MIT
---

# Rattail

A Vite+ oriented, AI Agent friendly front-end toolchain from [rattail](https://github.com/varletjs/rattail). All utilities, integrations, and CLI are published under one `rattail` package.

**IMPORTANT:** For each API, open the corresponding `references/<name>.md` (see tables below). Those files mirror the VitePress docs (usage, arguments, return), link to the official English and Chinese pages on [rattail.varletjs.org](https://rattail.varletjs.org), and include the corresponding `src/**/*.ts` excerpt as type declarations.

---

## CLI (`rt`)

Binary name: **`rt`** (registered via `package.json` → `dist/cli/bin.mjs`). Built with Commander. Unifies release, changelog, commit-lint, API generation, hook management, cleanup, and lockfile checking into a single CLI.

**Configuration:** All CLI commands read from the `rattail` key inside `vite.config.ts` (loaded via `unconfig`). See [references/cli/configuration.md](references/cli/configuration.md).

### Commands

| Command                  | Description                                                    | Reference                                                            |
| ------------------------ | -------------------------------------------------------------- | -------------------------------------------------------------------- |
| `rt clean [patterns...]` | Remove files and directories using glob patterns               | [references/cli/clean.md](references/cli/clean.md)                   |
| `rt api`                 | Generate API modules from OpenAPI/Swagger schema               | [references/cli/api.md](references/cli/api.md)                       |
| `rt hook`                | Install git hooks from config                                  | [references/cli/hook.md](references/cli/hook.md)                     |
| `rt release`             | Release packages, generate changelogs, tag, optionally publish | [references/cli/release.md](references/cli/release.md)               |
| `rt changelog`           | Generate changelog                                             | [references/cli/changelog.md](references/cli/changelog.md)           |
| `rt commit-lint <path>`  | Lint a commit message file                                     | [references/cli/commit-lint.md](references/cli/commit-lint.md)       |
| `rt lockfile-check`      | Check lockfile updates and auto-install dependencies           | [references/cli/lockfile-check.md](references/cli/lockfile-check.md) |

### Quick start

```ts
// vite.config.ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    clean: ['dist', 'coverage'],

    hook: {
      'commit-msg': ['rt commit-lint $1'],
    },

    api: {
      input: './schema.yaml',
      output: './src/apis/generated',
      preset: 'axle',
    },

    release: {
      // @varlet/release options
    },

    changelog: {
      // @varlet/release changelog options
    },
  },
})
```

### Programmatic usage

All CLI commands are also available as functions:

```ts
import { clean, api, hook, release, changelog, commitLint, lockfileCheck } from 'rattail/cli'
```

---

## Core functions

Import from `rattail`:

```ts
import { isString, debounce, cloneDeep /* ... */ } from 'rattail'
```

### General

| Function                                                 | Description                                                                                                      |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [`isString`](references/isString.md)                     | Determine whether the input value is a `string`.                                                                 |
| [`isNumber`](references/isNumber.md)                     | Determine whether the input value is a `number`.                                                                 |
| [`isNumeric`](references/isNumeric.md)                   | Determine whether the input value is a `number` or a `numeric string`.                                           |
| [`isBoolean`](references/isBoolean.md)                   | Determine whether the input value is a `boolean`.                                                                |
| [`isTruthy`](references/isTruthy.md)                     | Determine whether the input value is `truthy`.                                                                   |
| [`isPrimitive`](references/isPrimitive.md)               | Determine whether the input value is a `primitive`.                                                              |
| [`isPlainObject`](references/isPlainObject.md)           | Determine whether the input value is a `plain object`.                                                           |
| [`isObject`](references/isObject.md)                     | Determine whether the input value is an `object` (excluding `null`).                                             |
| [`isArray`](references/isArray.md)                       | Determine whether the input value is an `array`.                                                                 |
| [`isNullish`](references/isNullish.md)                   | Determine whether the input value is `null` or `undefined`.                                                      |
| [`isPromise`](references/isPromise.md)                   | Determine whether the input value is a `Promise`.                                                                |
| [`isRegExp`](references/isRegExp.md)                     | Determine whether the input value is a `RegExp`.                                                                 |
| [`isFunction`](references/isFunction.md)                 | Determine whether the input value is a `function`.                                                               |
| [`isDate`](references/isDate.md)                         | Determine whether the input value is a `Date`.                                                                   |
| [`isSet`](references/isSet.md)                           | Determine whether the input value is a `Set`.                                                                    |
| [`isMap`](references/isMap.md)                           | Determine whether the input value is a `Map`.                                                                    |
| [`isSymbol`](references/isSymbol.md)                     | Determine whether the input value is a `symbol`.                                                                 |
| [`isWeakMap`](references/isWeakMap.md)                   | Determine whether the input value is a `WeakMap`.                                                                |
| [`isWeakSet`](references/isWeakSet.md)                   | Determine whether the input value is a `WeakSet`.                                                                |
| [`isBlob`](references/isBlob.md)                         | Determine whether the input value is a `Blob`.                                                                   |
| [`isFile`](references/isFile.md)                         | Determine whether the input value is a `File`.                                                                   |
| [`isArrayBuffer`](references/isArrayBuffer.md)           | Determine whether the input value is a `ArrayBuffer`.                                                            |
| [`isTypedArray`](references/isTypedArray.md)             | Determine whether the input value is a `TypedArray`.                                                             |
| [`isDataView`](references/isDataView.md)                 | Determine whether the input value is a `DataView`.                                                               |
| [`isError`](references/isError.md)                       | Determine whether the input value is an `Error` object.                                                          |
| [`isDOMException`](references/isDOMException.md)         | Determine whether the input value is a `DOMException` object.                                                    |
| [`isWindow`](references/isWindow.md)                     | Determine whether the input value is the global `window` object.                                                 |
| [`isEmpty`](references/isEmpty.md)                       | Determine whether the input value is empty (`undefined`, `null`, an `empty string`, or an `empty array`).        |
| [`isEmptyPlainObject`](references/isEmptyPlainObject.md) | Determine whether the input value is a empty (no own enumerable keys and no symbols) plain object.               |
| [`isNonEmptyArray`](references/isNonEmptyArray.md)       | Determine whether the input value is a `non-empty array`.                                                        |
| [`isEqual`](references/isEqual.md)                       | Deeply compare two values.                                                                                       |
| [`isEqualWith`](references/isEqualWith.md)               | Deeply compare two values. Supports passing a comparison method, and returns `true` if the two values are equal. |
| [`inBrowser`](references/inBrowser.md)                   | Determine whether the code is running in a `browser` environment.                                                |
| [`inMobile`](references/inMobile.md)                     | Determine whether the code is running in a `mobile` browser environment.                                         |
| [`hasOwn`](references/hasOwn.md)                         | Determine whether an `object` has a specific property as its own (not inherited).                                |
| [`hasDuplicates`](references/hasDuplicates.md)           | Checks if an array contains duplicate values.                                                                    |
| [`hasDuplicatesBy`](references/hasDuplicatesBy.md)       | Checks if an array contains duplicate values based on a custom comparison function.                              |
| [`supportTouch`](references/supportTouch.md)             | Determine whether the current environment supports `touch events`.                                               |
| [`toTypeString`](references/toTypeString.md)             | Return the `type string` of the input value.                                                                     |
| [`toRawType`](references/toRawType.md)                   | Return the `raw type` of the input value.                                                                        |
| [`getGlobalThis`](references/getGlobalThis.md)           | Retrieve the global object based on the current environment.                                                     |
| [`assert`](references/assert.md)                         | Throws an error when the input value is not `true`, the second argument is the error message.                    |

### Number

| Function                                           | Description                                                                                   |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`toNumber`](references/toNumber.md)               | Convert the input value to a `number`. If the value is `null` or `undefined`, it returns `0`. |
| [`genNumberKey`](references/genNumberKey.md)       | Generate a unique numeric key, `incrementing` with each call.                                 |
| [`randomNumber`](references/randomNumber.md)       | Generate a random integer between `min` and `max`, inclusive.                                 |
| [`clamp`](references/clamp.md)                     | Clamp a number within the inclusive `min` and `max` bounds.                                   |
| [`clampArrayRange`](references/clampArrayRange.md) | Clamp an index within the bounds of an array's length.                                        |
| [`times`](references/times.md)                     | Execute a function a specified number of times and return an array of results.                |
| [`delay`](references/delay.md)                     | Create a promise that resolves after a specified time in milliseconds.                        |

### String

| Function                                     | Description                                                                                   |
| -------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`randomString`](references/randomString.md) | Generate a random alphanumeric string of a specified length.                                  |
| [`randomColor`](references/randomColor.md)   | Generate a random hexadecimal color string.                                                   |
| [`genStringKey`](references/genStringKey.md) | Generate a unique `string` key by incrementing a numeric value and converting it to a string. |
| [`camelize`](references/camelize.md)         | Convert a string to `camelCase`.                                                              |
| [`kebabCase`](references/kebabCase.md)       | Convert a string to `kebab-case`.                                                             |
| [`pascalCase`](references/pascalCase.md)     | Convert a string to `PascalCase`.                                                             |
| [`upperFirst`](references/upperFirst.md)     | Capitalize the `first letter` of a `string`, leaving the rest unchanged.                      |
| [`lowerFirst`](references/lowerFirst.md)     | Lowercase the `first letter` of the `string` and keep the rest unchanged.                     |
| [`slash`](references/slash.md)               | Convert all backslashes (`\`) in a path to forward slashes (`/`).                             |
| [`ensurePrefix`](references/ensurePrefix.md) | Ensure that a prefix exists in the `string`, and add it if it does not exist.                 |
| [`ensureSuffix`](references/ensureSuffix.md) | Ensure that a suffix exists in the `string`, and add it if it does not exist.                 |
| [`maskString`](references/maskString.md)     | Mask part of a string with a specified character, keeping prefix and suffix visible.          |

### Math

| Function                           | Description                                                                         |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| [`sum`](references/sum.md)         | Calculates the sum of values in an `array` of numbers.                              |
| [`sumBy`](references/sumBy.md)     | Calculates the sum of values in an `array` based on a provided function.            |
| [`sumHash`](references/sumHash.md) | Calculate a hash sum for a given value.                                             |
| [`minBy`](references/minBy.md)     | Find the `minimum` value in an `array` based on a function applied to each element. |
| [`maxBy`](references/maxBy.md)     | Find the maximum value in an array based on a function applied to each element.     |
| [`mean`](references/mean.md)       | Calculate the `mean` (average) of an `array` of `numbers`.                          |
| [`meanBy`](references/meanBy.md)   | Calculate the mean (average) of an `array` by applying a function to each element.  |
| [`sample`](references/sample.md)   | Return a random element from an `array`.                                            |
| [`round`](references/round.md)     | Return number rounded to precision.                                                 |
| [`floor`](references/floor.md)     | Return number rounded down to precision.                                            |
| [`ceil`](references/ceil.md)       | Return number rounded up to precision.                                              |

### Object

| Function                                                     | Description                                                                               |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| [`set`](references/set.md)                                   | Set a value at a given path in an object, creating nested objects or arrays as needed.    |
| [`pick`](references/pick.md)                                 | Pick object properties and construct a new object.                                        |
| [`pickBy`](references/pickBy.md)                             | Extract object properties by a predicate function and construct a new object.             |
| [`omit`](references/omit.md)                                 | Excludes object properties and constructs a new object.                                   |
| [`omitBy`](references/omitBy.md)                             | Excludes object properties by a predicate function and constructs a new object.           |
| [`mapObject`](references/mapObject.md)                       | Maps an object into a new object.                                                         |
| [`objectKeys`](references/objectKeys.md)                     | Get an array of keys from an object, with full TypeScript type support.                   |
| [`objectEntries`](references/objectEntries.md)               | Get an array of key-value pairs from an object, with full TypeScript type support.        |
| [`promiseWithResolvers`](references/promiseWithResolvers.md) | Returns an object containing a new Promise and two functions to `resolve` or `reject` it. |

### Array

| Function                                             | Description                                                                                                  |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`at`](references/at.md)                             | Retrieves the element at a specified index in an `array`, supporting negative indices.                       |
| [`chunk`](references/chunk.md)                       | Chunking an `array`. The passed `size` indicates the length of the chunk.                                    |
| [`uniq`](references/uniq.md)                         | Creates a duplicate-free version of an `array`, using the values equality.                                   |
| [`uniqBy`](references/uniqBy.md)                     | Creates a duplicate-free version of an `array`, using a custom comparison function.                          |
| [`difference`](references/difference.md)             | Creates an `array` of values not contained in other given arrays.                                            |
| [`differenceWith`](references/differenceWith.md)     | Creates an `array` of values not contained in other given arrays, with custom comparison.                    |
| [`intersection`](references/intersection.md)         | Creates an `array` of unique values contained in all given arrays.                                           |
| [`intersectionWith`](references/intersectionWith.md) | Creates an `array` of unique values contained in all given arrays, with custom comparison.                   |
| [`xor`](references/xor.md)                           | XOR (Exclusive OR) the passed array and return a new `array`.                                                |
| [`xorWith`](references/xorWith.md)                   | XOR (Exclusive OR) the passed array with custom comparison.                                                  |
| [`groupBy`](references/groupBy.md)                   | Group the elements in a given `array` by a function's return value as the key.                               |
| [`find`](references/find.md)                         | Finds the `first` or `last` element in an array that meets a condition, returning the element and its index. |
| [`shuffle`](references/shuffle.md)                   | Randomly shuffles elements within an `array`.                                                                |
| [`removeItem`](references/removeItem.md)             | Removes the first occurrence of a specific item from an `array`.                                             |
| [`removeItemBy`](references/removeItemBy.md)         | Removes the first item matching a predicate, mutating the original array.                                    |
| [`removeItemsBy`](references/removeItemsBy.md)       | Removes all items matching a predicate, mutating the original array.                                         |
| [`toggleItem`](references/toggleItem.md)             | Adds or removes an item from an `array`, based on its existence.                                             |
| [`removeArrayBlank`](references/removeArrayBlank.md) | Removes `null` or `undefined` values from an `array`.                                                        |
| [`removeArrayEmpty`](references/removeArrayEmpty.md) | Removes `null`, `undefined`, or empty string (`''`) values from an `array`.                                  |
| [`normalizeToArray`](references/normalizeToArray.md) | Converts a value to an `array` if it is not already an array.                                                |

### Collection

| Function                                       | Description                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| [`cloneDeep`](references/cloneDeep.md)         | Create a deep clone of a value.                                         |
| [`cloneDeepWith`](references/cloneDeepWith.md) | Create a deep clone of a value, applying a custom function for cloning. |
| [`merge`](references/merge.md)                 | Merge two objects recursively.                                          |
| [`mergeWith`](references/mergeWith.md)         | Merge two objects recursively, with custom merge logic.                 |

### Function

| Function                                     | Description                                                                              |
| -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [`NOOP`](references/NOOP.md)                 | This method returns `undefined`.                                                         |
| [`call`](references/call.md)                 | Call a single function or multiple functions and pass arguments to them.                 |
| [`callOrReturn`](references/callOrReturn.md) | Calls a function with args if input is a function, otherwise returns the input directly. |
| [`once`](references/once.md)                 | Creates a function that will only execute once.                                          |
| [`debounce`](references/debounce.md)         | Create a `debounce` function that delays execution by `delay` ms after the last call.    |
| [`throttle`](references/throttle.md)         | Create a throttle function that calls `fn` at most once every `delay` ms.                |
| [`tryCall`](references/tryCall.md)           | Safely call a function and return an `[error, result]` tuple.                            |
| [`tryAsyncCall`](references/tryAsyncCall.md) | Safely call an async function and return a `Promise<[error, result]>` tuple.             |

### File

| Function                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- |
| [`toText`](references/toText.md)               | Converts a `File` object to a text string.     |
| [`toDataURL`](references/toDataURL.md)         | Converts a `File` object to a Data URL string. |
| [`toArrayBuffer`](references/toArrayBuffer.md) | Converts a `File` object to an `ArrayBuffer`.  |

### Util

| Function                                                       | Description                                                                                                   |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [`motion`](references/motion.md)                               | Used to implement basic transition animation based on `requestAnimationFrame`.                                |
| [`copyText`](references/copyText.md)                           | Copies text to the clipboard.                                                                                 |
| [`download`](references/download.md)                           | Trigger browser download, supporting downloading via file `url`, `Blob`, `File`.                              |
| [`duration`](references/duration.md)                           | Creates a fluent duration builder that allows chaining time units to calculate total milliseconds or seconds. |
| [`enumOf`](references/enumOf.md)                               | Enum utility with TS-friendly types. Built-in fields: `value`, `label`, `description`.                        |
| [`storage`](references/storage.md)                             | Enhance `localStorage` and `sessionStorage`, support automatic JSON `stringify` and `parse`.                  |
| [`classes`](references/classes.md)                             | Generates a list of class names based on a given condition.                                                   |
| [`createNamespaceFn`](references/createNamespaceFn.md)         | Creates a namespace function for BEM-style naming.                                                            |
| [`createCacheManager`](references/createCacheManager.md)       | Creates a simple in-memory cache manager with optional TTL support.                                           |
| [`raf`](references/raf.md)                                     | Creates a Promise-based `requestAnimationFrame` that resolves on the next frame.                              |
| [`doubleRaf`](references/doubleRaf.md)                         | Creates a Promise-based double `requestAnimationFrame` that resolves after two frames.                        |
| [`requestAnimationFrame`](references/requestAnimationFrame.md) | Provides a cross-browser compatible `requestAnimationFrame` function.                                         |
| [`cancelAnimationFrame`](references/cancelAnimationFrame.md)   | Cancels a `requestAnimationFrame` request, with a fallback to `clearTimeout`.                                 |
| [`inViewport`](references/inViewport.md)                       | Determines if an element is visible within the viewport.                                                      |
| [`preventDefault`](references/preventDefault.md)               | Prevents the default action of an event if it is cancelable.                                                  |
| [`getStyle`](references/getStyle.md)                           | Retrieves computed CSS styles for a given DOM element.                                                        |
| [`getRect`](references/getRect.md)                             | Gets the dimensions and position of an element or window as a `DOMRect` object.                               |
| [`getScrollTop`](references/getScrollTop.md)                   | Gets the vertical scroll position of an element or window.                                                    |
| [`getScrollLeft`](references/getScrollLeft.md)                 | Gets the horizontal scroll position of an element or window.                                                  |
| [`getParentScroller`](references/getParentScroller.md)         | Finds the closest scrollable ancestor of an element.                                                          |
| [`getAllParentScroller`](references/getAllParentScroller.md)   | Retrieves all scrollable ancestor elements of an element.                                                     |
| [`prettyJSONObject`](references/prettyJSONObject.md)           | Formats a `JSON` object with indentation for easy readability.                                                |
| [`tryParseJSON`](references/tryParseJSON.md)                   | Attempts to parse a `JSON` string. If parsing fails, returns `undefined`.                                     |
| [`navigation`](references/navigation.md)                       | Browser-level navigation API for real page jumps.                                                             |

### Integrated

| Function                     | Description                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| [`mitt`](references/mitt.md) | Event emitter / pubsub. Integrated with [mitt](https://github.com/developit/mitt). |
| [`uuid`](references/uuid.md) | UUID generation helpers integrated with [uuid](https://github.com/uuidjs/uuid).    |

---

## First-party integration: Axle (`rattail/axle`)

Progressive HTTP request layer on top of **axios** for **Vue 3** (and plain JS for the core client), re-exported as a first-party integration. Three entry points:

| Entry       | Import             | Purpose                                                             |
| ----------- | ------------------ | ------------------------------------------------------------------- |
| Core        | `rattail/axle`     | `createAxle`, types, `createMatcher`, helpers, interceptors         |
| Vue         | `rattail/axle/use` | `createUseAxle`, `useValues`, `useHasLoading`, `useAverageProgress` |
| API builder | `rattail/axle/api` | `createApi` — URL-bound `load` / `use` helpers                      |

**Upstream:** [`@varlet/axle`](https://github.com/varletjs/axle) · [README](https://github.com/varletjs/axle/blob/main/packages/axle/README.md) · [Chinese README](https://github.com/varletjs/axle/blob/main/packages/axle/README.zh-CN.md)

**IMPORTANT:** Open [`references/axle/<topic>.md`](references/axle/core-client.md) for detailed API docs, type declarations, and usage examples.

### Quick start

```ts
import { createAxle } from 'rattail/axle'

const axle = createAxle(/* axios create config */)
axle.get('/url', { current: 1, pageSize: 10 }, { headers: {} })
```

### Topic references

| Topic                                                                  | Reference                                                                                  |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `createAxle`, `AxleInstance`, shared `axios`, headers, runner overview | [references/axle/core-client.md](references/axle/core-client.md)                           |
| GET/POST/… runners (`getBlob`, `postUrlEncode`, …)                     | [references/axle/request-runners.md](references/axle/request-runners.md)                   |
| `createUseAxle` and composables                                        | [references/axle/vue-composition.md](references/axle/vue-composition.md)                   |
| `createApi` (`load`, `use`, path params)                               | [references/axle/api-factory.md](references/axle/api-factory.md)                           |
| `matchPattern`, `createMatcher`, interceptors                          | [references/axle/interceptors-and-matcher.md](references/axle/interceptors-and-matcher.md) |
| `withResponse`, `download`                                             | [references/axle/helpers.md](references/axle/helpers.md)                                   |

Peer dependency: **`vue` ^3.2** when using `rattail/axle/use` or `rattail/axle/api`.

---

## First-party integration: Ruler Factory (`rattail/ruler-factory`)

Flexible chainable validation rule factory for TypeScript/JavaScript, re-exported as a first-party integration. Supports UI form integration with Varlet, Vant, Naive UI, Element Plus.

```ts
import { rulerFactory } from 'rattail/ruler-factory'
```

**Upstream:** [`ruler-factory`](https://github.com/varletjs/ruler-factory) · [README](https://github.com/varletjs/ruler-factory/blob/main/README.md) · [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md)

**IMPORTANT:** Before chaining rules, read the reference for `rulerFactory` and your UI's `generator` pattern, then open the specific [`references/ruler-factory/<name>.md`](references/ruler-factory/rulerFactory.md) for the method or type you use.

### Quick start

```ts
import { rulerFactory } from 'rattail/ruler-factory'

const r = rulerFactory((validator) => {
  return (value) => {
    const e = validator(value)
    return e ? e.message : true
  }
})

r().string('Not a string').required('Required').min(2, 'Too short').done()
```

### API index

#### Package

| Symbol                                                     | Description                                                    |
| ---------------------------------------------------------- | -------------------------------------------------------------- |
| [`rulerFactory`](references/ruler-factory/rulerFactory.md) | Factory that builds a chainable ruler for your UI rule format. |

#### Exported types

| Symbol                                                                       | Description                                     |
| ---------------------------------------------------------------------------- | ----------------------------------------------- |
| [`RulerFactoryMessage`](references/ruler-factory/RulerFactoryMessage.md)     | String or lazy string for error messages.       |
| [`RulerFactoryValidator`](references/ruler-factory/RulerFactoryValidator.md) | Validator fn: value in, Error or undefined out. |
| [`RulerFactoryGenerator`](references/ruler-factory/RulerFactoryGenerator.md) | Maps validator + params to rule type R.         |
| [`RulerContext`](references/ruler-factory/RulerContext.md)                   | Chainable context type (methods + extend).      |

#### Type guards

| Symbol                                               | Description                            |
| ---------------------------------------------------- | -------------------------------------- |
| [`string`](references/ruler-factory/string.md)       | Assert string type (optional message). |
| [`number`](references/ruler-factory/number.md)       | Assert number type.                    |
| [`array`](references/ruler-factory/array.md)         | Assert array type.                     |
| [`boolean`](references/ruler-factory/boolean.md)     | Assert boolean type.                   |
| [`object`](references/ruler-factory/object.md)       | Assert plain object type.              |
| [`symbol`](references/ruler-factory/symbol.md)       | Assert symbol type.                    |
| [`bigint`](references/ruler-factory/bigint.md)       | Assert bigint type.                    |
| [`null`](references/ruler-factory/null.md)           | Assert value is null.                  |
| [`undefined`](references/ruler-factory/undefined.md) | Assert value is undefined.             |
| [`true`](references/ruler-factory/true.md)           | Assert value is true.                  |
| [`false`](references/ruler-factory/false.md)         | Assert value is false.                 |

#### Validators

| Symbol                                                 | Description                                 |
| ------------------------------------------------------ | ------------------------------------------- |
| [`required`](references/ruler-factory/required.md)     | Reject empty values (rattail isEmpty).      |
| [`min`](references/ruler-factory/min.md)               | Min length / numeric min depending on type. |
| [`max`](references/ruler-factory/max.md)               | Max length / numeric max depending on type. |
| [`length`](references/ruler-factory/length.md)         | Exact length for string or array.           |
| [`regex`](references/ruler-factory/regex.md)           | String matches RegExp.                      |
| [`startsWith`](references/ruler-factory/startsWith.md) | String starts with prefix.                  |
| [`endsWith`](references/ruler-factory/endsWith.md)     | String ends with suffix.                    |
| [`includes`](references/ruler-factory/includes.md)     | Substring or array includes value.          |
| [`uppercase`](references/ruler-factory/uppercase.md)   | String is all uppercase.                    |
| [`lowercase`](references/ruler-factory/lowercase.md)   | String is all lowercase.                    |
| [`email`](references/ruler-factory/email.md)           | String looks like an email.                 |
| [`gt`](references/ruler-factory/gt.md)                 | Number/bigint greater than.                 |
| [`gte`](references/ruler-factory/gte.md)               | Number/bigint greater or equal.             |
| [`lt`](references/ruler-factory/lt.md)                 | Number/bigint less than.                    |
| [`lte`](references/ruler-factory/lte.md)               | Number/bigint less or equal.                |
| [`positive`](references/ruler-factory/positive.md)     | Number/bigint > 0.                          |
| [`negative`](references/ruler-factory/negative.md)     | Number/bigint < 0.                          |
| [`uniq`](references/ruler-factory/uniq.md)             | Array has no duplicates.                    |
| [`uniqBy`](references/ruler-factory/uniqBy.md)         | Array unique by comparator.                 |

#### Predicates

| Symbol                                   | Description                 |
| ---------------------------------------- | --------------------------- |
| [`is`](references/ruler-factory/is.md)   | Custom predicate must pass. |
| [`not`](references/ruler-factory/not.md) | Custom predicate must fail. |

#### Finish

| Symbol                                     | Description               |
| ------------------------------------------ | ------------------------- |
| [`done`](references/ruler-factory/done.md) | Return built rules array. |

#### Custom

| Symbol                                                 | Description                     |
| ------------------------------------------------------ | ------------------------------- |
| [`addRule`](references/ruler-factory/addRule.md)       | Append custom validator.        |
| [`getMessage`](references/ruler-factory/getMessage.md) | Resolve message string/lazy fn. |

#### Transform

| Symbol                                                   | Description                                 |
| -------------------------------------------------------- | ------------------------------------------- |
| [`trim`](references/ruler-factory/trim.md)               | Trim strings before validation.             |
| [`toLowerCase`](references/ruler-factory/toLowerCase.md) | Lowercase strings before validation.        |
| [`toUpperCase`](references/ruler-factory/toUpperCase.md) | Uppercase strings before validation.        |
| [`transform`](references/ruler-factory/transform.md)     | Replace transformer with custom fn.         |
| [`transformer`](references/ruler-factory/transformer.md) | Current transform pipeline (internal hook). |

---

## First-party integration: Vite Plus (`rattail/vite-plus`)

Preset lint (oxlint) and format (oxfmt) configuration for projects using [vite-plus](https://github.com/configurajs/vite-plus), re-exported as a first-party integration.

```ts
import { lint, fmt } from 'rattail/vite-plus'
```

**Upstream:** [`@configurajs/vite-plus`](https://github.com/configurajs/vite-plus)

### Quick start

```ts
// oxlint.config.ts
import { lint } from 'rattail/vite-plus'

export default lint()

// oxfmt.config.ts
import { fmt } from 'rattail/vite-plus'

export default fmt()
```

### API index

| Symbol                                 | Description                                                                         |
| -------------------------------------- | ----------------------------------------------------------------------------------- |
| [`lint`](references/vite-plus/lint.md) | Creates an `OxlintConfig` with sensible defaults for TypeScript, Vue 3, and Vitest. |
| [`fmt`](references/vite-plus/fmt.md)   | Returns a preset oxfmt configuration object with opinionated defaults.              |

### Exported types

| Symbol                   | Description                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `LintOptions`            | Options for `lint()`: `ts`, `vue`, `react`, `vitest`, `rules`, `ignores`, `overrides`. |
| `LintOptionsVue`         | Vue-specific options (`version?: 2 \| 3`).                                             |
| `CreateVueConfigOptions` | Vue config options used by lint internally.                                            |
| `OxlintConfig`           | The oxlint configuration object type.                                                  |
| `OxlintOverride`         | Override config for specific file patterns.                                            |
| `DummyRule`              | Rule severity type (`AllowWarnDeny` or tuple).                                         |
