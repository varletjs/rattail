export function pascalCase(s: string): string {
  return camelize(s).replace(s.charAt(0), s.charAt(0).toUpperCase())
}

export function camelize(s: string): string {
  s = s.replace(/-(\w)/g, (_: any, p: string) => p.toUpperCase())
  return s.replace(s.charAt(0), s.charAt(0).toLowerCase())
}

export function kebabCase(s: string): string {
  const ret = s.replace(/([A-Z])/g, ' $1').trim()
  return ret.split(' ').join('-').toLowerCase()
}

export function slash(path: string) {
  const isExtendedLengthPath = path.startsWith('\\\\?\\')

  if (isExtendedLengthPath) {
    return path
  }

  return path.replace(/\\/g, '/')
}

let key = 0

export function genStringKey() {
  return `generated-key-${key++}`
}

export function upperFirst(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function lowerFirst(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1)
}

export function randomString(length = 10) {
  let str = baseRandomString()

  while (str.length < length) {
    str += baseRandomString()
  }

  function baseRandomString() {
    return Math.random().toString(36).slice(2)
  }

  return str.slice(0, length)
}

export function randomColor() {
  const letters = '0123456789abcdef'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}
