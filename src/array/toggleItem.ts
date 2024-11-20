import { removeItem } from './removeItem'

export function toggleItem<T>(arr: T[], item: T) {
  arr.includes(item) ? removeItem(arr, item) : arr.push(item)
  return arr
}
