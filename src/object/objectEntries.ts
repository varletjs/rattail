export function objectEntries<T extends object>(object: T) {
  return Object.entries(object) as Array<[keyof T & string, T[keyof T & string]]>
}
