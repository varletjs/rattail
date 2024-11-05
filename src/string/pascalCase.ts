import { camelize } from './camelize'

export function pascalCase(s: string): string {
  return camelize(s).replace(s.charAt(0), s.charAt(0).toUpperCase())
}
