import { camelize } from './camelize'

export function pascalCase(s: string): string {
  const ret = camelize(s)
  return ret.replace(ret.charAt(0), ret.charAt(0).toUpperCase())
}
