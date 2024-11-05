export function ensurePrefix(s: string, prefix: string) {
  return s.startsWith(prefix) ? s : prefix + s
}
