export interface MaskStringOptions {
  prefix?: number
  suffix?: number
  mask?: string
  maskLength?: number
}

export function maskString(text: string, { prefix = 2, suffix = 2, mask = '*', maskLength }: MaskStringOptions = {}) {
  if (text.length <= 1) {
    return text
  }

  const effectivePrefix = Math.min(prefix, text.length - 1)
  const effectiveSuffix = Math.min(suffix, Math.max(text.length - effectivePrefix - 1, 0))
  const count = maskLength ?? text.length - effectivePrefix - effectiveSuffix
  const suffixPart = effectiveSuffix > 0 ? text.slice(-effectiveSuffix) : ''

  return text.slice(0, effectivePrefix) + mask.repeat(count) + suffixPart
}
