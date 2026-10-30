export function stringifyStableJSON(value: unknown): string | undefined {
  const serialized = JSON.stringify(value)

  if (serialized === undefined || (serialized[0] !== '[' && serialized[0] !== '{')) {
    return serialized
  }

  const tokens = serialized.match(/"(?:[^"\\]|\\.)*"|[{}[\],:]|[^\s{}[\],:"]+/g) ?? []
  let index = 0

  return stringifyJsonValue()

  function stringifyJsonValue(): string {
    const token = tokens[index++]

    if (token === '[') {
      const items: string[] = []

      while (tokens[index] !== ']') {
        items.push(stringifyJsonValue())

        if (tokens[index] === ',') {
          index += 1
        }
      }

      index += 1

      return `[${items.join(',')}]`
    }

    if (token === '{') {
      const entries: [string, string][] = []

      while (tokens[index] !== '}') {
        const keyToken = tokens[index++]
        const key: string = JSON.parse(keyToken)
        index += 1
        entries.push([key, `${keyToken}:${stringifyJsonValue()}`])

        if (tokens[index] === ',') {
          index += 1
        }
      }

      index += 1
      entries.sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0))

      return `{${entries.map((entry) => entry[1]).join(',')}}`
    }

    return token
  }
}
