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
      attributes: {
        disabled: false,
        required: true,
        checked: false,
        draggable: false,
        'aria-hidden': false,
        'data-enabled': true,
        tabindex: 0,
        missing: null,
        ignored: undefined,
      },
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

  it('lets explicit properties override initial attributes', () => {
    const input = createElement('input', {
      attributes: { value: 'default', disabled: true, type: 'text' },
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
      attributes: { disablepictureinpicture: false, disableremoteplayback: true },
    })
    const element = createElement('div', { attributes: { xml: 'plain', xlink: 'plain' } })

    expect(video.hasAttribute('disablepictureinpicture')).toBe(false)
    expect(video.getAttribute('disableremoteplayback')).toBe('')
    expect(element.getAttributeNS(null, 'xml')).toBe('plain')
    expect(element.getAttributeNS(null, 'xlink')).toBe('plain')
  })

  it('supports object styles, custom properties, null clearing and dataset values', () => {
    const element = createElement('div', {
      attributes: { style: 'color: blue; border-width: 1px', 'data-old': 'remove' },
      style: { color: 'red', borderWidth: null, '--gap': 8, '--unused': null, width: undefined },
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
    const options = Object.freeze({ style, attributes: Object.freeze({ id: 'immutable' }) })
    const children = Object.freeze(['text', null])

    expect(createElement('div', options, children).outerHTML).toBe('<div id="immutable" style="color: red;">text</div>')
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

  it('assigns native handlers and preserves native this binding', () => {
    const calls: unknown[] = []
    const button = createElement('button', {
      onclick(event) {
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
    const button = createElement('button', { on: { click, 'user:ready': custom, focus: listener, blur: undefined } })

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
    const button = createElement('button', { on: { click: new Listener() } })
    button.dispatchEvent(event)

    expect(handler).toHaveBeenCalledExactlyOnceWith(event)
  })

  it('preserves native this binding for event-map callbacks', () => {
    let target: Element | undefined
    const button = createElement('button', {
      on: {
        click() {
          target = this
        },
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
    const parent = createElement('div', { on: { click: [once, { once: true, capture: true }] } })
    const child = createElement('button', {
      on: { click: [aborted, { signal: controller.signal }], touchstart: [passive, { passive: true }] },
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
      on: { click: [capture, true] },
    })

    button.click()
    expect(capture).toHaveBeenCalledTimes(1)
  })

  it('installs handlers and request configuration before assigning resource URLs', () => {
    let prepared = false
    const src = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src')
    vi.spyOn(HTMLImageElement.prototype, 'src', 'set').mockImplementation(function (this: HTMLImageElement, value) {
      prepared = this.crossOrigin === 'anonymous' && this.onload !== null
      src?.set?.call(this, value)
      this.dispatchEvent(new Event('load'))
    })
    const load = vi.fn()
    const image = createElement('img', { src: '/image.png', onload: load, crossOrigin: 'anonymous' })

    expect(image.getAttribute('src')).toBe('/image.png')
    expect(prepared).toBe(true)
    expect(load).toHaveBeenCalledTimes(1)
  })

  it('creates SVG roots and namespaced children with exact tag casing', () => {
    const gradient = createElement('linearGradient', { namespace: 'svg', attributes: { id: 'gradient' } })
    const circle = createElement('circle', {
      namespace: 'svg',
      attributes: { cx: 10, cy: 10, r: 8, 'stroke-width': 2 },
      style: { fill: 'red' },
      dataset: { shape: 'circle' },
    })
    const svg = createElement('svg', { attributes: { viewBox: '0 0 20 20' } }, [gradient, circle])

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
    const svgLink = createElement('a', { namespace: 'svg', attributes: { href: '/svg' } })
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
      attributes: { 'xlink:href': '#shape', 'xml:lang': 'en', xmlns: 'http://www.w3.org/2000/svg', hidden: false },
    })
    const cleared = createElement('use', { namespace: 'svg', attributes: { 'xlink:href': null } })

    expect(use.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe('#shape')
    expect(use.getAttributeNS('http://www.w3.org/XML/1998/namespace', 'lang')).toBe('en')
    expect(use.getAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns')).toBe('http://www.w3.org/2000/svg')
    expect(use.getAttribute('hidden')).toBe('false')
    expect(cleared.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBeNull()
  })

  it('rejects readonly assignments supplied from JavaScript', () => {
    expect(() => Reflect.apply(createElement, undefined, ['div', { clientWidth: 12 }])).toThrow('Cannot assign')
  })

  it.each([
    { namespace: 'mathml' },
    { style: [] },
    { attributes: 'invalid' },
    { dataset: [] },
    { on: { click: 1 } },
    { on: { click: [() => undefined, 'invalid'] } },
    { on: { click: {} } },
  ])('rejects invalid JavaScript configuration %j', (options) => {
    expect(() => Reflect.apply(createElement, undefined, ['div', options])).toThrow(TypeError)
  })

  it('rejects non-node object children supplied from JavaScript', () => {
    expect(() => Reflect.apply(createElement, undefined, ['div', {}, { text: 'invalid' }])).toThrow(TypeError)
  })
})
