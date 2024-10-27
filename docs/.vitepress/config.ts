import { defineConfig } from 'vitepress'

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
            items: [{ text: 'isString', link: '/zh/general/is-string' }],
          },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/varletjs/rattail' }],
      },
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
        items: [{ text: 'isString', link: '/general/is-string' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/varletjs/rattail' }],
  },
})
