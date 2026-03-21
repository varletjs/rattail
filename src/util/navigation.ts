import { isString } from '../general'

export interface NavigationTarget {
  to: string
  query?: Record<string, string>
  hash?: string
}

export function buildNavigationUrl(target: string | NavigationTarget): string {
  if (isString(target)) {
    return target
  }

  const { to, query, hash } = target

  const hashIndex = to.indexOf('#')
  const toWithoutHash = hashIndex >= 0 ? to.slice(0, hashIndex) : to
  const existingHash = hashIndex >= 0 ? `#${to.slice(hashIndex + 1)}` : ''

  const queryIndex = toWithoutHash.indexOf('?')
  const base = queryIndex >= 0 ? toWithoutHash.slice(0, queryIndex) : toWithoutHash
  const existingQueryString = queryIndex >= 0 ? toWithoutHash.slice(queryIndex + 1) : ''

  const params = new URLSearchParams(existingQueryString)

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      params.append(key, value)
    }
  }

  const queryString = params.toString()
  const finalHash = hash ?? existingHash

  let url = base

  if (queryString) {
    url += `?${queryString}`
  }

  if (finalHash) {
    url += finalHash
  }

  return url
}

export const navigation = {
  push(target: string | NavigationTarget) {
    window.location.assign(buildNavigationUrl(target))
  },

  replace(target: string | NavigationTarget) {
    window.location.replace(buildNavigationUrl(target))
  },

  open(target: string | NavigationTarget) {
    const url = buildNavigationUrl(target)
    window.open(url)
  },

  back() {
    window.history.back()
  },

  go(delta: number) {
    window.history.go(delta)
  },
}
