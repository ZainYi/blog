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
          }
        ]
      },
      {
        text: 'CSS3',
        items: [{
            text: 'CSS3 布局',
            link: '/CSS3/Layout/'
          },
          {
            text: 'CSS3 新特性',
            link: '/CSS3/Feature/'
          },
          {
            text: 'CSS3 基础',
            link: '/CSS3/Basic/'
          }
        ]
      },
      {
        text: 'HTML5',
        link: '/HTML5/'
      },
      {
        text: 'Node.js',
        link: '/Node/'
      },
      {
        text: 'Server',
        link: '/Server/'
      },
      {
        text: 'HTTP',
        link: '/HTTP/'
      },
      {
        text: 'Tool',
        link: '/Tool/'
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
        children: [
          '/ECMAScript/',
          '/ECMAScript/ECMAScript5/',
          '/ECMAScript/ECMAScript2015/'
        ]
      },
      {
        title: 'CSS3',
        children: ['/CSS3/Layout/', '/CSS3/Feature/', '/CSS3/Basic/']
      },
      '/HTML5/',
      '/Node/',
      '/Server/',
      '/HTTP/'
    ]
  }
}