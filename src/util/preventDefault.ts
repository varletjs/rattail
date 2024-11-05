export function preventDefault(event: Event) {
  if (event.cancelable === false) {
    return
  }

  event.preventDefault()
}
