module.exports = {
  dest: 'dist',
  title: 'Zain Yi',
  description: 'TO BE A CRACKER',
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
        link: '/ECMAScript/'
      },
      {
        text: 'CSS3&HTML5',
        link: '/CSS3HTML5/'
      },
      {
        text: 'Node',
        link: '/Node/'
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
      '/ECMAScript/',
      '/CSS3HTML5/',
      '/Node/',
      {
        title: '服务端',
        children: ['/Server/Java/', '/Server/Python/']
      },
      '/Tool/',
      '/HTTP/'
    ]
  }
}
