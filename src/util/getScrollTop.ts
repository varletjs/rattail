export function getScrollTop(element: Element | Window) {
  const top = 'scrollTop' in element ? element.scrollTop : element.scrollY

  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0)
}
