export function prettyJSONObject(jsonObject: Record<string, any>) {
  return JSON.stringify(jsonObject, null, 2)
}
