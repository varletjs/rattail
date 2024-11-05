export function at<T>(arr: T[], index: number): T | undefined {
  if (!arr.length) {
    return
  }

  if (index < 0) {
    index += arr.length
  }

  return arr[index]
}
