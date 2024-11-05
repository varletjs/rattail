export function tryParseJSON<T>(json: string): T | undefined {
  try {
    return JSON.parse(json)
  } catch {
    return undefined
  }
}
