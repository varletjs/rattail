# duration

创建一个流式的时间计算构建器，允许链式调用时间单位函数来计算总毫秒数或秒数。

### 使用

```ts
import { duration } from 'rattail'

// 基础用法
const oneDay = duration().days(1).valueOf() // 86400000 毫秒
const oneHour = duration().hours(1).valueOf() // 3600000 毫秒

// 链式调用多个时间单位函数
const complexDuration = duration()
  .years(1)
  .months(2)
  .weeks(1)
  .days(3)
  .hours(4)
  .minutes(30)
  .seconds(15)
  .milliseconds(500)
  .valueOf()

// 获取秒数而不是毫秒数
const inSeconds = duration().hours(2).valueOf({ milliseconds: false }) // 7200 秒

// 实际使用示例
const cacheExpiry = duration().hours(24).valueOf() // 24 小时的毫秒数
const animationDelay = duration().seconds(2).milliseconds(500).valueOf() // 2.5 秒的毫秒数
const timeout = duration().minutes(5).valueOf() // 5 分钟的毫秒数
```

### 方法

`duration()` 函数返回一个包含以下可链式调用方法的对象：

#### 时间单位方法

| 方法                          | 描述                            |
| ----------------------------- | ------------------------------- |
| `years(value: number)`        | 添加年份到时间长度（365 天）    |
| `months(value: number)`       | 添加月份到时间长度（30 天）     |
| `weeks(value: number)`        | 添加周数到时间长度（7 天）      |
| `days(value: number)`         | 添加天数到时间长度（24 小时）   |
| `hours(value: number)`        | 添加小时到时间长度（60 分钟）   |
| `minutes(value: number)`      | 添加分钟到时间长度（60 秒）     |
| `seconds(value: number)`      | 添加秒数到时间长度（1000 毫秒） |
| `milliseconds(value: number)` | 添加毫秒数到时间长度            |

#### valueOf 方法

| 方法                                           | 描述             |
| ---------------------------------------------- | ---------------- |
| `valueOf(options?: { milliseconds: boolean })` | 返回总时间长度值 |

### 注意事项

- 所有时间单位方法都支持链式调用
- 转换比率是近似值：
  - 1 年 = 365 天
  - 1 月 = 30 天
  - 这些是简化的转换，不考虑闰年或不同月份的天数差异
