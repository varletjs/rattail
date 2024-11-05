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
