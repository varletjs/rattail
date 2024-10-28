import { defineConfig } from 'vitepress'

function withI18n(items: { link: string; text: string }[], locale: 'zh') {
  return items.map((item) => {
    return {
      ...item,
      link: `/${locale}${item.link}`,
    }
  })
}

const generalItems = [
  { text: 'isString', link: '/general/is-string' },
  { text: 'isNumber', link: '/general/is-number' },
  { text: 'isNumeric', link: '/general/is-numeric' },
  { text: 'isBoolean', link: '/general/is-boolean' },
  { text: 'isTruthy', link: '/general/is-truthy' },
  { text: 'isPlainObject', link: '/general/is-plain-object' },
  { text: 'isObject', link: '/general/is-object' },
  { text: 'isArray', link: '/general/is-array' },
  { text: 'isNullish', link: '/general/is-nullish' },
  { text: 'isPromise', link: '/general/is-promise' },
  { text: 'isFunction', link: '/general/is-function' },
  { text: 'isDate', link: '/general/is-date' },
  { text: 'isSet', link: '/general/is-set' },
  { text: 'isMap', link: '/general/is-map' },
  { text: 'isSymbol', link: '/general/is-symbol' },
  { text: 'isWindow', link: '/general/is-window' },
  { text: 'isRegExp', link: '/general/is-reg-exp' },
  { text: 'isEmpty', link: '/general/is-empty' },
  { text: 'isNonEmptyArray', link: '/general/is-non-empty-array' },
  { text: 'inBrowser', link: '/general/in-browser' },
  { text: 'inMobile', link: '/general/in-mobile' },
  { text: 'hasOwn', link: '/general/has-own' },
  { text: 'supportTouch', link: '/general/support-touch' },
  { text: 'toTypeString', link: '/general/to-type-string' },
  { text: 'toRawType', link: '/general/to-raw-type' },
  { text: 'getGlobalThis', link: '/general/get-global-this' },
]

const numberItems = [
  { text: 'toNumber', link: '/number/to-number' },
  { text: 'genNumberKey', link: '/number/gen-number-key' },
  { text: 'randomNumber', link: '/number/random-number' },
  { text: 'clamp', link: '/number/clamp' },
  { text: 'clampArrayRange', link: '/number/clamp-array-range' },
]

export default defineConfig({
  title: 'Rattail',
  description: 'A utilities library for front-end developers, lightweight and ts-friendly',
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh',
      themeConfig: {
        nav: [{ text: '首页', link: '/zh' }],

        sidebar: [
          {
            text: '简介',
            items: [{ text: '快速开始', link: '/zh/getting-started' }],
          },
          {
            text: '通用',
            items: withI18n(numberItems, 'zh'),
          },
          {
            text: '数字',
            items: withI18n(generalItems, 'zh'),
          },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/varletjs/rattail' }],
      },
    },
  },
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    logo: { src: '/logo.svg', style: { height: '28px' } },
    nav: [{ text: 'Home', link: '/' }],

    sidebar: [
      {
        text: 'Introduction',
        items: [{ text: 'Getting Started', link: '/getting-started' }],
      },
      {
        text: 'General',
        items: generalItems,
      },
      {
        text: 'Number',
        items: numberItems,
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/varletjs/rattail' }],
  },
})
