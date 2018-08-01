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
    nav: [{
        text: '主页',
        link: '/'
      },
      {
        text: 'JavaScript',
        items: [{
            text: 'ECMAScript',
            link: '/JavaScript/ECMAScript/'
          },
          {
            text: 'Vue',
            link: '/JavaScript/Vue/'
          },
          {
            text: 'React',
            link: '/JavaScript/React/'
          },
        ]
      },
      {
        text: 'CSS3&HTML5',
        link: '/CSS3HTML5/'
      },
      {
        text: 'Node.js',
        items: [{
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
        items: [{
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
        link: '/Tool/'
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
        title: 'JavaScript',
        children: ['/JavaScript/ECMAScript/', '/JavaScript/Vue/', '/JavaScript/React/']
      },
      '/CSS3HTML5/',
      {
        title: 'Node',
        children: ['/Node/Base/', '/Node/Koa/']
      },
      {
        title: '服务端',
        children: ['/Server/Java/', '/Server/Python/']
      },
      '/Tool/',
      '/HTTP/'
    ]
  }
}