module.exports = {
  dest: 'dist',
  title: 'Zain Yi',
  description: '成为一个靠谱的黑客',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: `/zain.png`
      }
    ]
  ],
  host: 'localhost',
  port: '8088',
  themeConfig: {
    nav: [
      {
        text: '主页',
        link: '/'
      },
      {
        text: 'ECMAScript',
        items: [
          {
            text: 'ECMAScript5.1',
            link: '/ECMAScript/ECMAScript5/'
          },
          {
            text: 'ECMAScript2015+',
            link: '/ECMAScript/ECMAScript2015/'
          }
        ]
      },
      {
        text: 'CSS3&HTML5',
        items: [
          {
            text: 'CSS3&HTML5 布局',
            link: '/CSS3HTML5/Layout/'
          },
          {
            text: 'CSS3&HTML5 新特性',
            link: '/CSS3HTML5/Feature/'
          },
          {
            text: 'CSS3&HTML5 基础',
            link: '/CSS3HTML5/Base/'
          }
        ]
      },
      {
        text: 'Node.js',
        items: [
          {
            text: 'Node 基础',
            link: '/Node/Base/'
          },
          {
            text: 'Koa',
            link: '/Node/Koa/'
          }
        ]
      },
      {
        text: '服务端',
        items: [
          {
            text: 'Java 开发',
            link: '/Server/Java/'
          },
          {
            text: 'Python 爬虫',
            link: '/Server/Python/'
          }
        ]
      },
      {
        text: 'Tool',
        items: [
          {
            text: 'Git 版本管理',
            link: '/Tool/Git/'
          },
          {
            text: 'MarkDown 编辑器',
            link: '/Tool/MarkDown/'
          },
          {
            text: 'Nginx 服务器',
            link: '/Tool/Nginx/'
          },
          {
            text: 'MySql 数据库',
            link: '/Tool/MySql/'
          }
        ]
      },
      {
        text: 'HTTP',
        link: '/HTTP/'
      },
      {
        text: '博主',
        link: '/About/'
      }
    ],
    sidebar: [
      '/',
      {
        title: 'ECMAScript',
        children: ['/ECMAScript/ECMAScript5/', '/ECMAScript/ECMAScript2015/']
      },
      {
        title: 'CSS3&HTML5',
        children: ['/CSS3HTML5/Layout/', '/CSS3HTML5/Feature/', '/CSS3HTML5/Base/']
      },
      {
        title: 'Node',
        children: ['/Node/Base/', '/Node/Koa/']
      },
      {
        title: '服务端',
        children: ['/Server/Java/', '/Server/Python/']
      },
      {
        title: '工具',
        children: [
          '/Tool/Git/',
          '/Tool/MarkDown/',
          '/Tool/Nginx/',
          '/Tool/MySql/'
        ]
      },
      '/HTTP/'
    ]
  }
}
