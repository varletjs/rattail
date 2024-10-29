import { defineConfig } from 'vitepress'
import { generalItems, numberItems, stringItems, arrayItems } from './items'

function withI18n(items: { link: string; text: string }[], locale: 'zh') {
  return items.map((item) => {
    return {
      ...item,
      link: `/${locale}${item.link}`,
    }
  })
}

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
            items: withI18n(generalItems, 'zh'),
          },
          {
            text: '数字',
            items: withI18n(numberItems, 'zh'),
          },
          {
            text: '字符串',
            items: withI18n(stringItems, 'zh'),
          },
          {
            text: '数组',
            items: withI18n(arrayItems, 'zh'),
          },
        ],

        docFooter: {
          prev: '上一篇',
          next: '下一篇',
        },

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
      {
        text: 'String',
        items: stringItems,
      },
      {
        text: 'Array',
        items: arrayItems,
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/varletjs/rattail' }],
  },
})
