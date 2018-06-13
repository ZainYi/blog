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
        link: '/JavaScript/'
      },
      {
        text: 'CSS3',
        link: '/CSS3/'
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
        text: '博主',
        link: '/About/'
      }
    ],
    sidebar: [
      '/',
      '/JavaScript/',
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