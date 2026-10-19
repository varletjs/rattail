export interface SplitLinesOptions {
  trim?: boolean
  compact?: boolean
}

export function splitLines(text: string, options: SplitLinesOptions = {}): string[] {
  const { trim = false, compact = false } = options
  const lines = text.split(/\r\n|\r|\n/)
  const normalizedLines = trim ? lines.map((line) => line.trim()) : lines

  return compact ? normalizedLines.filter((line) => line !== '') : normalizedLines
}
