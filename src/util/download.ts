import { isString } from '../general'

export function download(val: string | Blob | File, filename: string = 'file') {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = isString(val) ? val : URL.createObjectURL(val)
  a.download = filename

  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(a.href)
  document.body.removeChild(a)
}
