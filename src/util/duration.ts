export function duration() {
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

  function years(value: number): typeof ctx {
    ctx.value += value * 365 * 24 * 60 * 60 * 1000
    return ctx
  }

  function months(value: number): typeof ctx {
    ctx.value += value * 30 * 24 * 60 * 60 * 1000
    return ctx
  }

  function weeks(value: number): typeof ctx {
    ctx.value += value * 7 * 24 * 60 * 60 * 1000
    return ctx
  }

  function days(value: number): typeof ctx {
    ctx.value += value * 24 * 60 * 60 * 1000
    return ctx
  }

  function hours(value: number): typeof ctx {
    ctx.value += value * 60 * 60 * 1000
    return ctx
  }

  function minutes(value: number): typeof ctx {
    ctx.value += value * 60 * 1000
    return ctx
  }

  function seconds(value: number): typeof ctx {
    ctx.value += value * 1000
    return ctx
  }

  function milliseconds(value: number): typeof ctx {
    ctx.value += value
    return ctx
  }

  function valueOf(options: { milliseconds: boolean } = { milliseconds: true }): number {
    return options.milliseconds ? ctx.value : ctx.value / 1000
  }

  return ctx
}
