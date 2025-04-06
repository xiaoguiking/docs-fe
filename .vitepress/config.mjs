import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Knowledge",
  description: "A knowledge Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'FrontEnd',
        items: [
          { text: 'typescript', link: '/typescript/index' },
          { text: 'Vue', link: '/vue/index' },
          { text: 'React', link: '/react/index' },
          { text: 'Nodejs', link: '/node/index' },
          { text: '前端工程化', link: '/webpack' },
        ]
      },
      { text: 'BackEnd', link: '/back-end' },
      { text: 'DataBase', link: '/database' }
    ],

    sidebar: [
      {
        text: 'FrontEnd',
        items: [
          { text: 'Vue', link: '/vue/index' },
          { text: 'React', link: '/react/index' },
          { text: '前端工程化', link: '/webpack/index' },
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Interview',
        items: [
          { text: '面试', link: '/interview/index' },
          { text: 'Vue 使用', link: '/interview/vue' },
          { text: 'Vue 原理', link: '/interview/vue-principle' },
          { text: 'React 使用', link: '/interview/react' },
          { text: 'React 原理', link: '/interview/react-principle' },
          { text: 'Webpack', link: '/interview/webpack' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Backend',
        items: [
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    // 支持全文搜索
    search: {
      provider: 'local'
    },
    // 自定义上次更新的文本和日期格式
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})

