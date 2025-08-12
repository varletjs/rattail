# duration

Creates a fluent duration builder that allows chaining time units to calculate total milliseconds or seconds.

### Usage

```ts
import { duration } from 'rattail'

// Basic usage
const oneDay = duration().days(1).valueOf() // 86400000 milliseconds
const oneHour = duration().hours(1).valueOf() // 3600000 milliseconds

// Chaining multiple units
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

// Get result in seconds instead of milliseconds
const inSeconds = duration().hours(2).valueOf({ milliseconds: false }) // 7200 seconds

// Real-world examples
const cacheExpiry = duration().hours(24).valueOf() // 24 hours in ms
const animationDelay = duration().seconds(2).milliseconds(500).valueOf() // 2.5 seconds in ms
const timeout = duration().minutes(5).valueOf() // 5 minutes in ms
```

### Methods

The `duration()` function returns an object with the following chainable methods:

#### Time Unit Methods

| Method                        | Description                               |
| ----------------------------- | ----------------------------------------- |
| `years(value: number)`        | Adds years to the duration (365 days)     |
| `months(value: number)`       | Adds months to the duration (30 days)     |
| `weeks(value: number)`        | Adds weeks to the duration (7 days)       |
| `days(value: number)`         | Adds days to the duration (24 hours)      |
| `hours(value: number)`        | Adds hours to the duration (60 minutes)   |
| `minutes(value: number)`      | Adds minutes to the duration (60 seconds) |
| `seconds(value: number)`      | Adds seconds to the duration (1000 ms)    |
| `milliseconds(value: number)` | Adds milliseconds to the duration         |

#### ValueOf Method

| Method                                         | Description                      |
| ---------------------------------------------- | -------------------------------- |
| `valueOf(options?: { milliseconds: boolean })` | Returns the total duration value |

### Notes

- All time unit methods are chainable, allowing for fluent API usage
- The conversion rates are approximate:
  - 1 year = 365 days
  - 1 month = 30 days
  - These are simplified conversions and don't account for leap years or varying month lengths
