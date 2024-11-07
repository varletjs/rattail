export function uniqBy<T>(arr: T[], fn: (a: T, b: T) => any): T[] {
  return arr.reduce((ret: T[], i: T) => {
    const index = ret.findIndex((j: T) => fn(i, j))

    if (index === -1) {
      ret.push(i)
    }

    return ret
  }, [])
}
