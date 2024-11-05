export function ensureSuffix(s: string, suffix: string) {
  return s.endsWith(suffix) ? s : s + suffix
}
