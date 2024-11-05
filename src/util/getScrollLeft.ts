export function getScrollLeft(element: Element | Window) {
  const left = 'scrollLeft' in element ? element.scrollLeft : element.scrollX

  return Math.max(left, 0)
}
