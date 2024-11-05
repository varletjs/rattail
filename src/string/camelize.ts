export function camelize(s: string): string {
  s = s.replace(/-(\w)/g, (_: any, p: string) => p.toUpperCase())
  return s.replace(s.charAt(0), s.charAt(0).toLowerCase())
}
