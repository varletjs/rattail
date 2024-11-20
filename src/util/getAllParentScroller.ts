import { isWindow } from '../general'
import { getParentScroller } from './getParentScroller'

export function getAllParentScroller(el: HTMLElement): (HTMLElement | Window)[] {
  const allParentScroller: (HTMLElement | Window)[] = []
  let element: HTMLElement | Window = el

  while (!isWindow(element)) {
    element = getParentScroller(element)
    allParentScroller.push(element)
  }

  return allParentScroller
}
