export function camelize(s: string): string {
  s = s.replace(/[-_](\w)/g, (_: any, p: string) => p.toUpperCase())
  return s.replace(s.charAt(0), s.charAt(0).toLowerCase())
}
