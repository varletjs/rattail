import { expectTypeOf } from 'vite-plus/test'
import { createElement, createMigration, type CreateElementOptions } from '../src'

const image = createElement('img', { src: '/image.png', loading: 'lazy', width: 32 })
const circle = createElement('circle', { namespace: 'svg', r: 12 })
const svg = createElement('svg', { viewBox: '0 0 20 20' })
const htmlAnchor = createElement('a', { href: '/' })
const svgAnchor = createElement('a', { namespace: 'svg', href: '#shape' })

expectTypeOf(image).toEqualTypeOf<HTMLImageElement>()
expectTypeOf(circle).toEqualTypeOf<SVGCircleElement>()
expectTypeOf(svg).toEqualTypeOf<SVGSVGElement>()
expectTypeOf(htmlAnchor).toEqualTypeOf<HTMLAnchorElement>()
expectTypeOf(svgAnchor).toEqualTypeOf<SVGAElement>()

createElement('button', {
  class: 'submit',
  'aria-label': 'Save',
  'data-count': 2,
  onClick(event) {
    expectTypeOf(event).toEqualTypeOf<PointerEvent>()
    expectTypeOf(this).toEqualTypeOf<Element>()
  },
  onKeydown: [
    (event) => {
      expectTypeOf(event).toEqualTypeOf<KeyboardEvent>()
    },
    { once: true, passive: false },
  ],
  onClickOnceCapture(event) {
    expectTypeOf(event).toEqualTypeOf<PointerEvent>()
  },
  'on:custom:ready'(event) {
    expectTypeOf(event).toEqualTypeOf<Event>()
  },
})
createElement('input', { form: 'owner', list: 'choices' })
createElement('iframe', { sandbox: 'allow-scripts' })

const options: CreateElementOptions<HTMLInputElement> = { checked: true, value: 'value' }
createElement('input', options)
createElement('div', { style: { color: 'red', '--gap': 4 } }, ['text', 0, false, null])
createElement('div', { className: null, id: null })
createElement('div', {}, 'single child')

// @ts-expect-error src must be a string
createElement('img', { src: 42 })
// @ts-expect-error disabled must be a boolean
createElement('button', { disabled: 'false' })
// @ts-expect-error clientWidth is readonly and is not an HTML attribute
createElement('div', { clientWidth: 10 })
// @ts-expect-error childNodes is readonly
createElement('div', { childNodes: [] })
// @ts-expect-error methods are not creation properties
createElement('div', { click() {} })
// @ts-expect-error standard CSS values do not infer units
createElement('div', { style: { width: 10 } })
// @ts-expect-error unsupported namespace
createElement('div', { namespace: 'mathml' })
// @ts-expect-error invalid native image loading value
createElement('img', { loading: 'sometimes' })
// @ts-expect-error listeners are flat onXxx properties
createElement('button', { on: { click() {} } })
// @ts-expect-error attributes are flat properties
createElement('div', { attributes: { id: 'legacy' } })
// @ts-expect-error native lowercase handler properties are replaced by onXxx
createElement('button', { onclick() {} })
// @ts-expect-error data attributes must be scalar values
createElement('div', { 'data-count': {} })
// @ts-expect-error click listeners receive a pointer event
createElement('button', { onClick(event: KeyboardEvent) {} })

const migration = createMigration({ currentVersion: 1, migrations: {} })
const pending = migration.migrate({ version: 1, value: {} })
expectTypeOf(pending).toEqualTypeOf<Promise<{ version: number; value: unknown }>>()

const customMigration = createMigration({ currentVersion: 1, getVersion: () => 1, migrations: {} })
expectTypeOf(customMigration.migrate({ value: {} })).toEqualTypeOf<typeof pending>()

// @ts-expect-error omitting the version requires a resolver
migration.migrate({ value: {} })

// @ts-expect-error stored versions must be numbers
migration.migrate({ version: '1', value: {} })
// @ts-expect-error steps must accept unvalidated input
createMigration({ currentVersion: 2, migrations: { 2: (value: { title: string }) => value.title } })
