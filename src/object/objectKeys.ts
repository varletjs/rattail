export function objectKeys<T extends object>(object: T) {
  return Object.keys(object) as Array<`${keyof T & string}`>
}
