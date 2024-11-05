import { isArray } from '../general'

export type ClassName = string | undefined | null

export type Classes = (ClassName | [any, ClassName, ClassName?])[]

export function classes(...classes: Classes): any[] {
  return classes.map((className) => {
    if (isArray(className)) {
      const [condition, truthy, falsy = null] = className
      return condition ? truthy : falsy
    }

    return className
  })
}
