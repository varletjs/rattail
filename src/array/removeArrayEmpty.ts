export function removeArrayEmpty<T>(arr: Array<T | null | undefined | ''>) {
  return arr.filter((item) => item != null && item !== '') as T[]
}
