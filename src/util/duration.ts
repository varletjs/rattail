export interface DurationContext {
  years(value: number): this
  months(value: number): this
  weeks(value: number): this
  days(value: number): this
  hours(value: number): this
  minutes(value: number): this
  seconds(value: number): this
  milliseconds(value: number): this
  valueOf(options?: { milliseconds: boolean }): number
}

export function duration(): DurationContext {
  const ctx = {
    value: 0,
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    valueOf,
  }

  function years(value: number) {
    ctx.value += value * 365 * 24 * 60 * 60 * 1000
    return ctx
  }

  function months(value: number) {
    ctx.value += value * 30 * 24 * 60 * 60 * 1000
    return ctx
  }

  function weeks(value: number) {
    ctx.value += value * 7 * 24 * 60 * 60 * 1000
    return ctx
  }

  function days(value: number) {
    ctx.value += value * 24 * 60 * 60 * 1000
    return ctx
  }

  function hours(value: number) {
    ctx.value += value * 60 * 60 * 1000
    return ctx
  }

  function minutes(value: number) {
    ctx.value += value * 60 * 1000
    return ctx
  }

  function seconds(value: number) {
    ctx.value += value * 1000
    return ctx
  }

  function milliseconds(value: number) {
    ctx.value += value
    return ctx
  }

  function valueOf(options: { milliseconds: boolean } = { milliseconds: true }): number {
    return options.milliseconds ? ctx.value : ctx.value / 1000
  }

  return ctx
}
