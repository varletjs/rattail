import { inBrowser } from './inBrowser'

export const defaultDocument: Document | undefined = inBrowser() ? window.document : undefined
