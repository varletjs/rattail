import { isPlainObject } from '../general/isPlainObject'

type WritableKeys<Value> = {
  [Key in keyof Value]-?: (<Item>() => Item extends Pick<Value, Key> ? 1 : 2) extends <Item>() => Item extends {
    -readonly [Property in Key]: Value[Property]
  }
    ? 1
    : 2
    ? Key
    : never
}[keyof Value]

type ElementProperties<Value extends Element> = {
  [
    Key in WritableKeys<Value> as Key extends 'style' | 'dataset'
      ? never
      : NonNullable<Value[Key]> extends (...args: never[]) => unknown
        ? Key extends `on${string}`
          ? Key
          : never
        : Key
  ]?: Value[Key]
}

export type ElementChild = Node | string | number | boolean | null | undefined | readonly ElementChild[]
export type ElementAttributeValue = string | number | boolean | null | undefined

export type ElementStyle = {
  [Key in keyof CSSStyleDeclaration as CSSStyleDeclaration[Key] extends string ? Key : never]?: string | null
} & { [Key in `--${string}`]?: string | number | null }

export type ElementListener<EventType extends Event = Event> =
  | { handleEvent(event: EventType): void }
  | { listener(this: Element, event: EventType): void }['listener']

export type ElementEvent<EventType extends Event = Event> =
  | ElementListener<EventType>
  | readonly [ElementListener<EventType>, boolean | AddEventListenerOptions]

export type ElementEvents = {
  [Key in keyof GlobalEventHandlersEventMap]?: ElementEvent<GlobalEventHandlersEventMap[Key]>
} & Record<string, ElementEvent | undefined>

export type CreateElementOptions<Value extends Element = HTMLElement> = ElementProperties<Value> & {
  attributes?: Readonly<Record<string, ElementAttributeValue>>
  style?: string | ElementStyle
  dataset?: Readonly<Record<string, ElementAttributeValue>>
  on?: ElementEvents
}

const htmlNamespace = 'http://www.w3.org/1999/xhtml'
const svgNamespace = 'http://www.w3.org/2000/svg'
const attributeNamespaces = new Map([
  ['xlink', 'http://www.w3.org/1999/xlink'],
  ['xml', 'http://www.w3.org/XML/1998/namespace'],
  ['xmlns', 'http://www.w3.org/2000/xmlns/'],
])
const booleanAttributes = new Set(
  'allowfullscreen async autofocus autoplay checked controls credentialless default defer disabled disablepictureinpicture disableremoteplayback formnovalidate hidden inert ismap itemscope loop multiple muted nomodule novalidate open playsinline readonly required reversed selected'.split(
    ' ',
  ),
)
const resourceProperties = new Set(['src', 'srcset', 'srcSet', 'href', 'poster', 'data'])

export function createElement<Tag extends keyof SVGElementTagNameMap>(
  tag: Tag,
  options: CreateElementOptions<SVGElementTagNameMap[Tag]> & { namespace: 'svg' },
  children?: ElementChild,
): SVGElementTagNameMap[Tag]
export function createElement(
  tag: string,
  options: CreateElementOptions<SVGElement> & { namespace: 'svg' },
  children?: ElementChild,
): SVGElement
export function createElement(
  tag: 'svg',
  options?: CreateElementOptions<SVGSVGElement> & { namespace?: 'svg' },
  children?: ElementChild,
): SVGSVGElement
export function createElement<Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  options?: CreateElementOptions<HTMLElementTagNameMap[Tag]> & { namespace?: 'html' },
  children?: ElementChild,
): HTMLElementTagNameMap[Tag]
export function createElement(
  tag: string,
  options?: CreateElementOptions<HTMLElement> & { namespace?: 'html' },
  children?: ElementChild,
): HTMLElement
export function createElement(tag: string, options: object = {}, children?: ElementChild): HTMLElement | SVGElement {
  const namespace =
    'namespace' in options && options.namespace !== undefined ? options.namespace : tag === 'svg' ? 'svg' : 'html'
  if (namespace !== 'html' && namespace !== 'svg') {
    throw new TypeError('Element namespace must be html or svg.')
  }

  const entries: [string, unknown][] = Object.entries(options)
  const content = entries.filter(
    ([key, value]) => (key === 'innerHTML' || key === 'textContent') && value !== undefined,
  )
  if (content.length > 1 || (content.length && children !== undefined)) {
    throw new TypeError('Specify only one of innerHTML, textContent or children.')
  }

  const element = namespace === 'svg' ? document.createElementNS(svgNamespace, tag) : document.createElement(tag)
  const properties = entries.filter(
    ([key, value]) => !['namespace', 'attributes', 'style', 'dataset', 'on'].includes(key) && value !== undefined,
  )

  for (const [key, value] of properties.filter(([key]) => key.startsWith('on'))) {
    setProperty(element, key, value)
  }

  if ('on' in options && options.on !== undefined) {
    for (const [name, configured] of getEntries(options.on)) {
      if (configured === undefined) {
        continue
      }

      const listener: unknown = Array.isArray(configured) ? configured[0] : configured
      const listenerOptions: unknown = Array.isArray(configured) ? configured[1] : undefined
      if (
        !isListener(listener) ||
        (listenerOptions !== undefined && typeof listenerOptions !== 'boolean' && !isPlainObject(listenerOptions))
      ) {
        throw new TypeError('Invalid element event listener.')
      }

      element.addEventListener(name, listener, listenerOptions)
    }
  }

  const attributes = 'attributes' in options && options.attributes !== undefined ? getEntries(options.attributes) : []
  for (const [name, value] of attributes.filter(([name]) => !resourceProperties.has(name))) {
    setAttribute(name, value)
  }

  if ('style' in options && options.style !== undefined) {
    if (typeof options.style === 'string') {
      element.style.cssText = options.style
    } else {
      for (const [name, value] of getEntries(options.style)) {
        if (value === undefined) {
          continue
        }

        if (name.startsWith('--') || name.includes('-')) {
          element.style.setProperty(name, value == null ? '' : String(value))
        } else {
          setProperty(element.style, name, value == null ? '' : String(value))
        }
      }
    }
  }

  if ('dataset' in options && options.dataset !== undefined) {
    for (const [name, value] of getEntries(options.dataset)) {
      if (value == null) {
        delete element.dataset[name]
      } else {
        element.dataset[name] = String(value)
      }
    }
  }

  for (const [key, value] of content) {
    setProperty(element, key, value)
  }

  appendChildren(children)

  for (const [key, value] of properties
    .filter(
      ([key]) => !key.startsWith('on') && key !== 'innerHTML' && key !== 'textContent' && !resourceProperties.has(key),
    )
    .sort(([first], [second]) => Number(second === 'type') - Number(first === 'type'))) {
    setProperty(element, key, value)
  }

  for (const [name, value] of attributes.filter(([name]) => resourceProperties.has(name))) {
    setAttribute(name, value)
  }

  for (const [key, value] of properties.filter(([key]) => resourceProperties.has(key))) {
    setProperty(element, key, value)
  }

  return element

  function setAttribute(name: string, value: unknown) {
    const separator = name.indexOf(':')
    const prefix = separator >= 0 ? name.slice(0, separator) : name === 'xmlns' ? 'xmlns' : ''
    const namespace = attributeNamespaces.get(prefix)
    const localName = name.slice(separator + 1)
    const boolean = element.namespaceURI === htmlNamespace && booleanAttributes.has(name.toLowerCase())

    if (value == null || (boolean && value === false)) {
      if (namespace) {
        element.removeAttributeNS(namespace, localName)
      } else {
        element.removeAttribute(name)
      }

      return
    }

    const serialized = boolean && value === true ? '' : String(value)
    if (namespace) {
      element.setAttributeNS(namespace, name, serialized)
    } else {
      element.setAttribute(name, serialized)
    }
  }

  function appendChildren(child: ElementChild) {
    if (child == null || typeof child === 'boolean') {
      return
    }

    if (Array.isArray(child)) {
      for (const item of child) {
        appendChildren(item)
      }

      return
    }

    if (typeof child === 'string' || typeof child === 'number') {
      element.appendChild(element.ownerDocument.createTextNode(String(child)))

      return
    }

    if (!isNode(child)) {
      throw new TypeError('Element children must be nodes, text or arrays.')
    }

    element.appendChild(child)
  }
}

function getEntries(value: unknown): [string, unknown][] {
  if (!isPlainObject(value)) {
    throw new TypeError('Element configuration must be a plain object.')
  }

  return Object.entries<unknown>(value)
}

function setProperty(target: object, key: string, value: unknown) {
  if (!Reflect.set(target, key, value)) {
    throw new TypeError('Cannot assign element property ' + key + '.')
  }
}

function isListener(value: unknown): value is EventListenerOrEventListenerObject {
  return (
    typeof value === 'function' ||
    (typeof value === 'object' && value !== null && 'handleEvent' in value && typeof value.handleEvent === 'function')
  )
}

function isNode(value: unknown): value is Node {
  return typeof value === 'object' && value !== null && 'nodeType' in value && typeof value.nodeType === 'number'
}
