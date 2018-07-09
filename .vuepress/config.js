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
        text: 'ECMAScript',
        items: [{
            text: 'ECMAScript5.1',
            link: '/ECMAScript/ECMAScript5/'
          },
          {
            text: 'ECMAScript2015+',
            link: '/ECMAScript/ECMAScript2015/'
          },
          {
            text: 'Vue',
            link: '/ECMAScript/Vue/'
          },
          {
            text: 'React',
            link: '/ECMAScript/React/'
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
        title: 'ECMAScript',
        children: ['/ECMAScript/ECMAScript5/', '/ECMAScript/ECMAScript2015/', '/ECMAScript/Vue/', '/ECMAScript/React/']
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