export function copyText(value: string) {
  if (!value) {
    return
  }

  const focusedElement =
    document.activeElement instanceof HTMLElement && document.activeElement !== document.body
      ? document.activeElement
      : undefined
  const container = focusedElement?.parentElement ?? document.body
  const textArea = document.createElement('textarea')
  textArea.value = value
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  container.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  textArea.remove()
  focusedElement?.focus({ preventScroll: true })
}
