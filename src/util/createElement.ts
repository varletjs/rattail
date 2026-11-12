import { groupBy } from '../array/groupBy'
import { normalizeToArray } from '../array/normalizeToArray'
import { hasOwn, isArray, isBoolean, isFunction, isNumber, isObject, isPlainObject, isString } from '../general'
import { kebabCase } from '../string/kebabCase'

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
    Key in keyof Value as Key extends
      | 'style'
      | 'dataset'
      | 'attributes'
      | 'className'
      | 'form'
      | 'list'
      | 'sandbox'
      | 'toString'
      | 'valueOf'
      | `on${string}`
      ? never
      : Key
  ]?: NonNullable<Value[Key]> extends (...args: never[]) => unknown
    ? never
    : Key extends keyof typeof enumeratedAttributes
      ? ElementAttributeValue
      : Key extends 'width' | 'height'
        ? string | number | null
        : Key extends WritableKeys<Value>
          ? Value[Key] | null
          : Value[Key] extends { readonly baseVal: unknown; readonly animVal: unknown }
            ? ElementAttributeValue
            : never
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
  [Key in keyof GlobalEventHandlersEventMap as `on${Capitalize<Key>}`]?: ElementEvent<
    GlobalEventHandlersEventMap[Key]
  > | null
} & {
  [Key in `on:${string}`]?: ElementEvent | null
}

type NativeEventProperties = {
  [Key in keyof HTMLElement as Key extends `on${string}` ? Key : never]?: never
}

export type CreateElementOptions<Value extends Element = HTMLElement> = ElementProperties<Value> &
  NativeEventProperties &
  ElementEvents & {
    [attribute: string]: unknown
    [attribute: `data-${string}`]: ElementAttributeValue
    [attribute: `aria-${string}`]: ElementAttributeValue
    class?: string | null
    className?: string | null
    form?: string | null
    list?: string | null
    sandbox?: string | null
    style?: string | ElementStyle
    dataset?: Readonly<Record<string, ElementAttributeValue>>
    attributes?: never
    on?: never
  }

const htmlNamespace = 'http://www.w3.org/1999/xhtml'
const svgNamespace = 'http://www.w3.org/2000/svg'
const attributeNamespaces = new Map([
  ['xlink', 'http://www.w3.org/1999/xlink'],
  ['xml', 'http://www.w3.org/XML/1998/namespace'],
  ['xmlns', 'http://www.w3.org/2000/xmlns/'],
])
const attributeAliases = new Map([
  ['className', 'class'],
  ['htmlFor', 'for'],
])
const enumeratedAttributes = { draggable: true, spellcheck: true, translate: true, autocorrect: true }
const booleanAttributes = new Set(
  'allowfullscreen async autofocus autoplay checked controls credentialless default defer disabled disablepictureinpicture disableremoteplayback formnovalidate hidden inert ismap itemscope loop multiple muted nomodule novalidate open playsinline readonly required reversed selected'.split(
    ' ',
  ),
)
const resourceProperties = new Set(['src', 'srcset', 'srcSet', 'href', 'xlink:href', 'poster', 'data'])
const valueProperties = new Set(['value', 'valueAsNumber', 'valueAsDate'])

export function createElement<Tag extends keyof SVGElementTagNameMap>(
  tag: Tag,
  options: CreateElementOptions<SVGElementTagNameMap[Tag]> & { namespace: 'svg' },
  children?: ElementChild,
): SVGElementTagNameMap[Tag]
export function createElement<const Tag extends string>(
  tag: Tag & (Tag extends keyof SVGElementTagNameMap ? never : unknown),
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
export function createElement<const Tag extends string>(
  tag: Tag & (Tag extends keyof HTMLElementTagNameMap | 'svg' ? never : unknown),
  options?: CreateElementOptions<HTMLElement> & { namespace?: 'html' },
  children?: ElementChild,
): HTMLElement
export function createElement(tag: string, options: object = {}, children?: ElementChild): HTMLElement | SVGElement {
  const namespace =
    'namespace' in options && options.namespace !== undefined ? options.namespace : tag === 'svg' ? 'svg' : 'html'
  if (namespace !== 'html' && namespace !== 'svg') {
    throw new TypeError('Element namespace must be html or svg.')
  }

  const entries: [string, unknown][] = Object.entries(options).filter(([, value]) => value !== undefined)
  if (entries.some(([key]) => key === 'on' || key === 'attributes')) {
    throw new TypeError('Use flat attributes and onXxx event listeners.')
  }

  const contentCount = entries.filter(([key]) => key === 'innerHTML' || key === 'textContent').length
  if (contentCount > 1 || (contentCount && children !== undefined)) {
    throw new TypeError('Specify only one of innerHTML, textContent or children.')
  }

  const element = namespace === 'svg' ? document.createElementNS(svgNamespace, tag) : document.createElement(tag)
  const {
    events = [],
    attributes = [],
    content = [],
    selectProperties = [],
    properties = [],
    values = [],
    resources = [],
  } = groupBy(
    entries.filter(([key]) => !['namespace', 'style', 'dataset'].includes(key)),
    ([key, value]) => {
      if (/^on(?:[A-Z]|:)/.test(key)) {
        return 'events'
      }

      if (/^on[a-z]/.test(key) && key in element) {
        throw new TypeError('Use onXxx event listeners.')
      }

      if (key === 'innerHTML' || key === 'textContent') {
        return 'content'
      }

      if (resourceProperties.has(key)) {
        return 'resources'
      }

      if (!shouldSetProperty(key, value)) {
        return 'attributes'
      }

      if (element.tagName === 'SELECT' && (key === 'multiple' || key === 'size')) {
        return 'selectProperties'
      }

      return valueProperties.has(key) ? 'values' : 'properties'
    },
  )

  for (const [key, configured] of events) {
    if (configured === null) {
      continue
    }

    const listener: unknown = isArray(configured) ? configured[0] : configured
    const listenerOptions: unknown = isArray(configured) ? configured[1] : undefined
    if (
      !isListener(listener) ||
      (listenerOptions !== undefined && !isBoolean(listenerOptions) && !isPlainObject(listenerOptions))
    ) {
      throw new TypeError('Invalid element event listener.')
    }

    element.addEventListener(key.startsWith('on:') ? key.slice(3) : kebabCase(key.slice(2)), listener, listenerOptions)
  }

  for (const [name, value] of attributes) {
    setAttribute(name, value)
  }

  if ('style' in options && options.style !== undefined) {
    if (isString(options.style)) {
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

  for (const [key, value] of selectProperties) {
    setElementProperty(key, value)
  }

  for (const [key, value] of content) {
    setProperty(element, key, value)
  }

  appendChildren(children)

  for (const [key, value] of properties.sort(
    ([first], [second]) => Number(second === 'type') - Number(first === 'type'),
  )) {
    setElementProperty(key, value)
  }

  for (const [key, value] of values) {
    setElementProperty(key, value)
  }

  for (const [key, value] of resources) {
    if (shouldSetProperty(key, value)) {
      setElementProperty(key, value)
    } else {
      setAttribute(key, value)
    }
  }

  return element

  function shouldSetProperty(key: string, value: unknown) {
    if (namespace === 'svg' || !(key in element)) {
      return false
    }

    if (
      (key === 'sandbox' && element.tagName === 'IFRAME') ||
      ((key === 'width' || key === 'height') && ['IMG', 'VIDEO', 'CANVAS', 'SOURCE'].includes(element.tagName))
    ) {
      return false
    }

    if (isString(value) && hasOwn(enumeratedAttributes, key)) {
      return false
    }

    let target: object | null = element
    while (target) {
      const descriptor = Object.getOwnPropertyDescriptor(target, key)
      if (descriptor) {
        return (
          (!!descriptor.set || descriptor.writable === true) &&
          !isFunction(descriptor.value) &&
          Object.getPrototypeOf(target) !== null
        )
      }

      target = Object.getPrototypeOf(target)
    }

    return false
  }

  function setElementProperty(key: string, value: unknown) {
    const normalized = value === null && isString(Reflect.get(element, key)) ? '' : value
    setProperty(element, key, normalized)
    if (value === null) {
      element.removeAttribute(attributeAliases.get(key) ?? key)
    }
  }

  function setAttribute(key: string, value: unknown) {
    const name = attributeAliases.get(key) ?? key
    const separator = name.indexOf(':')
    const prefix = separator >= 0 ? name.slice(0, separator) : name === 'xmlns' ? 'xmlns' : ''
    const namespace = attributeNamespaces.get(prefix)
    const localName = name.slice(separator + 1)
    const boolean = element.namespaceURI === htmlNamespace && booleanAttributes.has(name.toLowerCase())

    if (value != null && !isString(value) && !isNumber(value) && !isBoolean(value)) {
      throw new TypeError('Element attributes must be strings, numbers, booleans or null.')
    }

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

  function appendChildren(children: ElementChild) {
    for (const child of normalizeToArray(children)) {
      if (child == null || isBoolean(child)) {
        continue
      }

      if (isArray(child)) {
        appendChildren(child)
        continue
      }

      if (isString(child) || isNumber(child)) {
        element.appendChild(element.ownerDocument.createTextNode(String(child)))
        continue
      }

      if (!isNode(child)) {
        throw new TypeError('Element children must be nodes, text or arrays.')
      }

      element.appendChild(child)
    }
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
  return isFunction(value) || (isObject(value) && 'handleEvent' in value && isFunction(value.handleEvent))
}

function isNode(value: unknown): value is Node {
  return isObject(value) && 'nodeType' in value && isNumber(value.nodeType)
}
