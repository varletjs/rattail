export function removeItemBy<T>(arr: T[], fn: (v: T) => any) {
  if (arr.length) {
    const index = arr.findIndex((v) => fn(v))
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
