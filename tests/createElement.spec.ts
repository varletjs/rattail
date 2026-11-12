import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vite-plus/test'
import { createElement } from '../src'

afterEach(() => {
  document.body.replaceChildren()
  vi.restoreAllMocks()
})

describe('createElement', () => {
  it('creates native HTML elements and assigns tag-specific properties', () => {
    const image = createElement('img', { src: '/avatar.png', alt: 'Avatar', width: 32, height: 24 })
    const input = createElement('input', { value: '42', type: 'number', disabled: false })

    expect(image).toBeInstanceOf(HTMLImageElement)
    expect(image.getAttribute('src')).toBe('/avatar.png')
    expect(image.alt).toBe('Avatar')
    expect(image.width).toBe(32)
    expect(image.height).toBe(24)
    expect(input.type).toBe('number')
    expect(input.value).toBe('42')
    expect(input.disabled).toBe(false)
    expectTypeOf(image).toEqualTypeOf<HTMLImageElement>()
    expectTypeOf(input).toEqualTypeOf<HTMLInputElement>()
  })

  it('supports omitted options and explicitly undefined namespace', () => {
    expect(createElement('div').outerHTML).toBe('<div></div>')
    expect(createElement('span', { namespace: undefined }).namespaceURI).toBe('http://www.w3.org/1999/xhtml')
  })

  it('supports flat aliases, custom attributes and null string properties', () => {
    const label = createElement('label', { class: 'field', for: 'name', 'custom-id': 12 })
    const empty = createElement('div', { id: null, className: null, missing: null })

    expect(label.className).toBe('field')
    expect(label.htmlFor).toBe('name')
    expect(label.getAttribute('custom-id')).toBe('12')
    expect(empty.hasAttribute('id')).toBe(false)
    expect(empty.hasAttribute('class')).toBe(false)
    expect(empty.hasAttribute('missing')).toBe(false)
  })

  it('preserves enumerated string values without boolean property coercion', () => {
    const element = createElement('div', { draggable: 'false', spellcheck: 'false', translate: 'no' })

    expect(element.draggable).toBe(false)
    expect(element.getAttribute('spellcheck')).toBe('false')
    expect(element.getAttribute('translate')).toBe('no')
  })

  it('keeps iframe sandbox and percentage dimensions as attributes', () => {
    const iframe = createElement('iframe', { sandbox: 'allow-scripts' })
    const image = createElement('img', { width: '100%', height: '50%' })

    expect(iframe.getAttribute('sandbox')).toBe('allow-scripts')
    expect(image.getAttribute('width')).toBe('100%')
    expect(image.getAttribute('height')).toBe('50%')
  })

  it('creates custom elements and dynamic HTML tag names', () => {
    const tag: string = 'custom-widget'
    const element = createElement(tag, { id: 'widget', textContent: 'ready' })

    expect(element.localName).toBe('custom-widget')
    expect(element.textContent).toBe('ready')
    expectTypeOf(element).toEqualTypeOf<HTMLElement>()
  })

  it('applies range bounds before current values regardless of configuration order', () => {
    const textValue = createElement('input', { value: '150', type: 'range', min: '100', max: '200' })
    const numericValue = createElement('input', { valueAsNumber: 150, type: 'range', min: '100', max: '200' })

    expect(textValue.value).toBe('150')
    expect(numericValue.valueAsNumber).toBe(150)
  })

  it('distinguishes boolean, enumerated, aria and data attributes', () => {
    const element = createElement('input', {
      disabled: false,
      required: true,
      checked: false,
      draggable: false,
      'aria-hidden': false,
      'data-enabled': true,
      tabindex: 0,
      missing: null,
      ignored: undefined,
    })

    expect(element.disabled).toBe(false)
    expect(element.required).toBe(true)
    expect(element.hasAttribute('checked')).toBe(false)
    expect(element.getAttribute('required')).toBe('')
    expect(element.getAttribute('draggable')).toBe('false')
    expect(element.getAttribute('aria-hidden')).toBe('false')
    expect(element.getAttribute('data-enabled')).toBe('true')
    expect(element.getAttribute('tabindex')).toBe('0')
    expect(element.hasAttribute('missing')).toBe(false)
    expect(element.hasAttribute('ignored')).toBe(false)
  })

  it('keeps default and current form values distinct', () => {
    const input = createElement('input', {
      defaultValue: 'default',
      disabled: false,
      value: 'current',
      type: 'email',
    })

    expect(input.defaultValue).toBe('default')
    expect(input.value).toBe('current')
    expect(input.disabled).toBe(false)
    expect(input.type).toBe('email')
  })

  it('handles media boolean attributes and leaves unprefixed attribute names in no namespace', () => {
    const video = createElement('video', {
      disablepictureinpicture: false,
      disableremoteplayback: true,
    })
    const element = createElement('div', { xml: 'plain', xlink: 'plain' })

    expect(video.hasAttribute('disablepictureinpicture')).toBe(false)
    expect(video.getAttribute('disableremoteplayback')).toBe('')
    expect(element.getAttributeNS(null, 'xml')).toBe('plain')
    expect(element.getAttributeNS(null, 'xlink')).toBe('plain')
  })

  it('supports object styles, custom properties, null clearing and dataset values', () => {
    const element = createElement('div', {
      'data-old': 'remove',
      style: {
        cssText: 'color: blue; border-width: 1px',
        color: 'red',
        borderWidth: null,
        '--gap': 8,
        '--unused': null,
        width: undefined,
      },
      dataset: { userId: 42, enabled: false, old: null, ignored: undefined },
    })

    expect(element.style.color).toBe('red')
    expect(element.style.borderWidth).toBe('')
    expect(element.style.getPropertyValue('--gap')).toBe('8')
    expect(element.style.getPropertyValue('--unused')).toBe('')
    expect(element.dataset.userId).toBe('42')
    expect(element.dataset.enabled).toBe('false')
    expect(element.dataset.old).toBeUndefined()
    expect(element.dataset.ignored).toBeUndefined()
  })

  it('supports a complete CSS string', () => {
    const element = createElement('div', { style: 'color: red; --gap: 4px' })

    expect(element.style.color).toBe('red')
    expect(element.style.getPropertyValue('--gap')).toBe('4px')
  })

  it('does not mutate the supplied configuration or child arrays', () => {
    const style = Object.freeze({ color: 'red' })
    const options = Object.freeze({ style, id: 'immutable' })
    const children = Object.freeze(['text', null])

    const element = createElement('div', options, children)
    expect(element.id).toBe('immutable')
    expect(element.style.color).toBe('red')
    expect(element.textContent).toBe('text')
  })

  it('appends nested arrays, existing nodes and fragments, treating strings as text', () => {
    const child = createElement('strong', { textContent: 'child' })
    const fragment = document.createDocumentFragment()
    fragment.append('fragment')
    const element = createElement('div', {}, ['<b>text</b>', [child, 0, false, null, undefined, true], fragment])

    expect(element.textContent).toBe('<b>text</b>child0fragment')
    expect(element.children.length).toBe(1)
    expect(element.firstElementChild).toBe(child)
    expect(fragment.childNodes.length).toBe(0)
  })

  it('supports readonly child arrays and reparenting', () => {
    const previous = createElement('div')
    const child = createElement('span')
    previous.append(child)
    const children: readonly Node[] = [child]
    const element = createElement('div', {}, children)

    expect(element.firstChild).toBe(child)
    expect(previous.childNodes.length).toBe(0)
  })

  it('normalizes single nodes, strings and numbers into child arrays', () => {
    const child = createElement('span')
    expect(createElement('div', {}, child).firstChild).toBe(child)
    expect(createElement('p', {}, 'text').textContent).toBe('text')
    expect(createElement('p', {}, 0).textContent).toBe('0')
  })

  it('accepts nodes from another browser realm', () => {
    const iframe = document.createElement('iframe')
    document.body.append(iframe)
    const child = iframe.contentDocument?.createElement('div')
    expect(child).toBeDefined()

    const element = createElement('div', {}, child)

    expect(element.firstChild).toBe(child)
  })

  it('sets select values after children and content regardless of option order', () => {
    const select = createElement('select', { value: 'b' }, [
      createElement('option', { value: 'a', textContent: 'A' }),
      createElement('option', { value: 'b', textContent: 'B' }),
    ])
    const fromHtml = createElement('select', {
      value: 'b',
      innerHTML: '<option value="a">A</option><option value="b">B</option>',
    })

    expect(select.value).toBe('b')
    expect(select.selectedIndex).toBe(1)
    expect(fromHtml.value).toBe('b')
  })

  it('supports textContent, innerHTML and empty children individually', () => {
    expect(createElement('div', { textContent: '<b>text</b>' }).innerHTML).toBe('&lt;b&gt;text&lt;/b&gt;')
    expect(createElement('div', { innerHTML: '<b>text</b>' }).firstElementChild?.tagName).toBe('B')
    expect(createElement('div', {}, null).childNodes.length).toBe(0)
    expect(createElement('div', {}, false).childNodes.length).toBe(0)
  })

  it.each([
    () => createElement('div', { textContent: 'text', innerHTML: '<b>html</b>' }),
    () => createElement('div', { textContent: 'text' }, 'child'),
    () => createElement('div', { innerHTML: '<b>html</b>' }, 'child'),
  ])('rejects ambiguous content configuration', (create) => {
    expect(create).toThrow('Specify only one')
  })

  it('registers onXxx handlers and preserves native this binding', () => {
    const calls: unknown[] = []
    const button = createElement('button', {
      onClick(event) {
        calls.push(this, event)
      },
    })
    const event = new MouseEvent('click')
    button.dispatchEvent(event)

    expect(calls).toEqual([button, event])
  })

  it('supports event maps, custom events, listener objects and native removal', () => {
    const click = vi.fn()
    const custom = vi.fn()
    const listener = { handleEvent: vi.fn() }
    const button = createElement('button', {
      onClick: click,
      'on:user:ready': custom,
      onFocus: listener,
      onBlur: undefined,
    })

    button.click()
    button.dispatchEvent(new CustomEvent('user:ready'))
    button.dispatchEvent(new FocusEvent('focus'))
    expect(click).toHaveBeenCalledTimes(1)
    expect(custom).toHaveBeenCalledTimes(1)
    expect(listener.handleEvent).toHaveBeenCalledTimes(1)
    button.removeEventListener('click', click)
    button.click()
    expect(click).toHaveBeenCalledTimes(1)
  })

  it('accepts listener methods inherited from a prototype', () => {
    const handler = vi.fn()
    class Listener {
      handleEvent(event: Event) {
        handler(event)
      }
    }

    const event = new MouseEvent('click')
    const button = createElement('button', { onClick: new Listener() })
    button.dispatchEvent(event)

    expect(handler).toHaveBeenCalledExactlyOnceWith(event)
  })

  it('preserves native this binding for onXxx callbacks', () => {
    let target: Element | undefined
    const button = createElement('button', {
      onClick() {
        target = this
      },
    })

    button.click()

    expect(target).toBe(button)
  })

  it('supports once, passive, capture and abort signals', () => {
    const once = vi.fn()
    const controller = new AbortController()
    const aborted = vi.fn()
    const passive = vi.fn((event: Event) => event.preventDefault())
    const parent = createElement('div', { onClick: [once, { once: true, capture: true }] })
    const child = createElement('button', {
      onClick: [aborted, { signal: controller.signal }],
      onTouchstart: [passive, { passive: true }],
    })
    parent.append(child)

    child.click()
    controller.abort()
    child.click()
    const event = new Event('touchstart', { cancelable: true })
    child.dispatchEvent(event)

    expect(once).toHaveBeenCalledTimes(1)
    expect(aborted).toHaveBeenCalledTimes(1)
    expect(event.defaultPrevented).toBe(false)
    expect(passive).toHaveBeenCalledTimes(1)
  })

  it('supports boolean capture options', () => {
    const capture = vi.fn()
    const button = createElement('button', {
      onClick: [capture, true],
    })

    button.click()
    expect(capture).toHaveBeenCalledTimes(1)
  })

  it('parses Vue-style modifier suffixes and keeps their flags over tuple options', () => {
    const click = vi.fn()
    const booleanCapture = vi.fn()
    const passive = vi.fn((event: Event) => event.preventDefault())
    const button = createElement('button', {
      onClickOnceCapture: [click, { once: false, capture: false }],
      onTouchstartPassiveOnce: passive,
    })
    button.click()
    button.click()
    const event = new Event('touchstart', { cancelable: true })
    button.dispatchEvent(event)
    button.dispatchEvent(new Event('touchstart'))
    const other = createElement('button', { onClickOnce: [booleanCapture, true] })
    other.click()
    other.click()

    expect(click).toHaveBeenCalledTimes(1)
    expect(passive).toHaveBeenCalledTimes(1)
    expect(booleanCapture).toHaveBeenCalledTimes(1)
    expect(event.defaultPrevented).toBe(false)
  })

  it('supports exact custom names and event names that equal a modifier', () => {
    const custom = vi.fn()
    const kebab = vi.fn()
    const once = vi.fn()
    const capture = vi.fn()
    const element = createElement('div', {
      'on:CustomReady': custom,
      onMyEvent: kebab,
      onOnce: once,
      'on:Capture': capture,
      onClick: null,
    })
    element.dispatchEvent(new Event('CustomReady'))
    element.dispatchEvent(new Event('customready'))
    element.dispatchEvent(new Event('my-event'))
    element.dispatchEvent(new Event('once'))
    element.dispatchEvent(new Event('Capture'))
    element.click()

    expect(custom).toHaveBeenCalledTimes(1)
    expect(kebab).toHaveBeenCalledTimes(1)
    expect(once).toHaveBeenCalledTimes(1)
    expect(capture).toHaveBeenCalledTimes(1)
  })

  it('installs handlers and request configuration before assigning resource URLs', () => {
    let prepared = false
    const src = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')
    vi.spyOn(HTMLImageElement.prototype, 'src', 'set').mockImplementation(function (this: HTMLImageElement, value) {
      prepared = this.crossOrigin === 'anonymous'
      src?.set?.call(this, value)
      this.dispatchEvent(new Event('load'))
    })
    const load = vi.fn()
    const image = createElement('img', { src: '/image.png', onLoad: load, crossOrigin: 'anonymous' })

    expect(image.getAttribute('src')).toBe('/image.png')
    expect(prepared).toBe(true)
    expect(load).toHaveBeenCalledTimes(1)
  })

  it('creates SVG roots and namespaced children with exact tag casing', () => {
    const gradient = createElement('linearGradient', { namespace: 'svg', id: 'gradient' })
    const circle = createElement('circle', {
      namespace: 'svg',
      cx: 10,
      cy: 10,
      r: 8,
      'stroke-width': 2,
      style: { fill: 'red' },
      dataset: { shape: 'circle' },
    })
    const svg = createElement('svg', { viewBox: '0 0 20 20' }, [gradient, circle])

    expect(svg).toBeInstanceOf(SVGSVGElement)
    expect(svg.namespaceURI).toBe('http://www.w3.org/2000/svg')
    expect(gradient.localName).toBe('linearGradient')
    expect(circle.namespaceURI).toBe(svg.namespaceURI)
    expect(circle.getAttribute('r')).toBe('8')
    expect(circle.style.fill).toBe('red')
    expect(circle.dataset.shape).toBe('circle')
    expect(svg.getAttribute('viewBox')).toBe('0 0 20 20')
    expectTypeOf(svg).toEqualTypeOf<SVGSVGElement>()
    expectTypeOf(circle).toEqualTypeOf<SVGCircleElement>()
  })

  it('uses explicit namespaces for overlapping tag names and unknown SVG elements', () => {
    const htmlLink = createElement('a', { href: '/html' })
    const svgLink = createElement('a', { namespace: 'svg', href: '/svg' })
    const tag: string = 'custom-svg'
    const customSvg = createElement(tag, { namespace: 'svg' })

    expect(htmlLink.namespaceURI).toBe('http://www.w3.org/1999/xhtml')
    expect(svgLink.namespaceURI).toBe('http://www.w3.org/2000/svg')
    expectTypeOf(htmlLink).toEqualTypeOf<HTMLAnchorElement>()
    expectTypeOf(svgLink).toEqualTypeOf<SVGAElement>()
    expectTypeOf(customSvg).toEqualTypeOf<SVGElement>()
  })

  it('sets and removes namespaced attributes and preserves SVG false values', () => {
    const use = createElement('use', {
      namespace: 'svg',
      'xlink:href': '#shape',
      'xml:lang': 'en',
      xmlns: 'http://www.w3.org/2000/svg',
      hidden: false,
    })
    const cleared = createElement('use', { namespace: 'svg', 'xlink:href': null })

    expect(use.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe('#shape')
    expect(use.getAttributeNS('http://www.w3.org/XML/1998/namespace', 'lang')).toBe('en')
    expect(use.getAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns')).toBe('http://www.w3.org/2000/svg')
    expect(use.getAttribute('hidden')).toBe('false')
    expect(cleared.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBeNull()
  })

  it('uses attributes for readonly form and list references', () => {
    const input = createElement('input', { form: 'owner', list: 'choices' })
    document.body.append(input)
    expect(input.getAttribute('form')).toBe('owner')
    expect(input.getAttribute('list')).toBe('choices')
    expect(input.form).toBeNull()
    expect(input.list).toBeNull()
  })

  it.each([
    { on: { click: () => undefined } },
    { attributes: { id: 'legacy' } },
    { onclick: () => undefined },
    { custom: {} },
    { ['__proto__']: { polluted: true } },
  ])('rejects legacy wrappers, lowercase handlers and nonscalar unknown attributes %j', (options) => {
    expect(() => Reflect.apply(createElement, undefined, ['div', options])).toThrow(TypeError)
  })

  it.each([
    { namespace: 'mathml' },
    { style: [] },
    { attributes: 'invalid' },
    { dataset: [] },
    { onClick: 1 },
    { onClick: [() => undefined, 'invalid'] },
    { onClick: {} },
  ])('rejects invalid JavaScript configuration %j', (options) => {
    expect(() => Reflect.apply(createElement, undefined, ['div', options])).toThrow(TypeError)
  })

  it('rejects non-node object children supplied from JavaScript', () => {
    expect(() => Reflect.apply(createElement, undefined, ['div', {}, { text: 'invalid' }])).toThrow(TypeError)
  })
})
