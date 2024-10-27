export function tryParseJSON<T>(json: string): T | undefined {
  try {
    return JSON.parse(json)
  } catch {
    return undefined
  }
}

export function prettyJSONObject(jsonObject: Record<string, any>) {
  return JSON.stringify(jsonObject, null, 2)
}
