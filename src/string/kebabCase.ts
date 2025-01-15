export function kebabCase(s: string): string {
  const ret = s
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_\s]+/g, '-')
    .trim()
  return ret.replace(/^-/, '').toLowerCase()
}
