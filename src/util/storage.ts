// @ts-expect-error overwrite type definition
import Cookie from 'js-cookie'
import { isString } from '../general'
import { getGlobalThis } from '../general/getGlobalThis'

export interface Storage extends globalThis.Storage {
  set(key: string, value: any): void
  get(key: string): any
  remove(key: string): void
}

export interface CookieAttributes {
  expires?: number | Date | undefined
  path?: string | undefined
  domain?: string | undefined
  secure?: boolean | undefined
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined
  [property: string]: any
}

export interface CookieStorage {
  set(key: string, value: any, options?: CookieAttributes): void
  get(key: string): any
  remove(key: string, options?: CookieAttributes): void
}

export function createStorage(storage: globalThis.Storage): Storage {
  return {
    ...storage,

    set(key: string, value: unknown) {
      if (value == null) {
        return
      }

      if (!isString(value)) {
        value = JSON.stringify(value)
      }

      storage.setItem(key, value as string)
    },

    get(key: string) {
      const data = storage.getItem(key) as string

      try {
        return JSON.parse(data)
      } catch (err) {
        return data
      }
    },

    remove(key: string): void {
      storage.removeItem(key)
    },
  }
}

export function createCookieStorage(options: CookieAttributes = {}): CookieStorage {
  const defaultOptions = options

  return {
    set(key: string, value: unknown, options: CookieAttributes = {}) {
      if (value == null) {
        return
      }

      if (!isString(value)) {
        value = JSON.stringify(value)
      }

      Cookie.set(key, value as string, { ...defaultOptions, ...options })
    },

    get(key: string) {
      const data = Cookie.get(key) as string

      try {
        return JSON.parse(data)
      } catch (err) {
        return data
      }
    },

    remove(key: string, options: CookieAttributes = {}): void {
      Cookie.remove(key, { ...defaultOptions, ...options })
    },
  }
}

export const sessionStorage = createStorage(getGlobalThis().sessionStorage)

export const localStorage = createStorage(getGlobalThis().localStorage)
