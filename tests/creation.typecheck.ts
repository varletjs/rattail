import { expectTypeOf } from 'vite-plus/test'
import { createElement, createMigration, type CreateElementOptions } from '../src'

const image = createElement('img', { src: '/image.png', loading: 'lazy', width: 32 })
const circle = createElement('circle', { namespace: 'svg', attributes: { r: 12 } })
const svg = createElement('svg')
const htmlAnchor = createElement('a', { href: '/' })
const svgAnchor = createElement('a', { namespace: 'svg', attributes: { href: '#shape' } })

expectTypeOf(image).toEqualTypeOf<HTMLImageElement>()
expectTypeOf(circle).toEqualTypeOf<SVGCircleElement>()
expectTypeOf(svg).toEqualTypeOf<SVGSVGElement>()
expectTypeOf(htmlAnchor).toEqualTypeOf<HTMLAnchorElement>()
expectTypeOf(svgAnchor).toEqualTypeOf<SVGAElement>()

createElement('button', {
  onclick(event) {
    expectTypeOf(event).toEqualTypeOf<PointerEvent>()
  },
  on: {
    click(event) {
      expectTypeOf(event).toEqualTypeOf<PointerEvent>()
      expectTypeOf(this).toEqualTypeOf<Element>()
    },
    keydown: [
      (event) => {
        expectTypeOf(event).toEqualTypeOf<KeyboardEvent>()
      },
      { once: true, passive: false },
    ],
    'custom:ready'(event) {
      expectTypeOf(event).toEqualTypeOf<Event>()
    },
  },
})

const options: CreateElementOptions<HTMLInputElement> = { checked: true, value: 'value' }
createElement('input', options)
createElement('div', { style: { color: 'red', '--gap': 4 } }, ['text', 0, false, null])

// @ts-expect-error src must be a string
createElement('img', { src: 42 })
// @ts-expect-error disabled must be a boolean
createElement('button', { disabled: 'false' })
// @ts-expect-error clientWidth is readonly
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

const migration = createMigration({ currentVersion: 1, migrations: {} })
const pending = migration.migrate({ version: 1, value: {} })
expectTypeOf(pending).toEqualTypeOf<Promise<{ version: number; value: unknown }>>()

// @ts-expect-error stored versions must be numbers
migration.migrate({ version: '1', value: {} })
// @ts-expect-error steps must accept unvalidated input
createMigration({ currentVersion: 2, migrations: { 2: (value: { title: string }) => value.title } })
