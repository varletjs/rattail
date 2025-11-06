export function removeItemsBy<T>(arr: T[], fn: (v: T) => any) {
  let i = 0

  const removedItems: T[] = []

  while (i < arr.length) {
    if (fn(arr[i])) {
      removedItems.push(...arr.splice(i, 1))
    } else {
      i++
    }
  }

  return removedItems
}
