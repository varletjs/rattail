export function uniq<T>(arr: T[]) {
  return [...new Set(arr)]
}
