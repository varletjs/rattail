export function removeArrayEmpty<T>(arr: (T | null | undefined | '')[]) {
  return arr.filter((item) => item != null && item !== '') as T[]
}
