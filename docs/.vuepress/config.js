module.exports = {
    title: '炸毛框架',
    description: '协程、高性能、多平台的 CQHTTP 框架',
    markdown: {
        lineNumbers: true
    },
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'msapplication-TileColor', content: '#00aba9' }]
    ],
    ga: 'UA-115509121-2',
    themeConfig: {
        repo: 'zhamao-robot/zhamao-framework',
        docsDir: 'docs',
        editLinks: false,
        lastUpdated: '上次更新',
        activeHeaderLinks: false,
        nav: [
            { text: '指南', link: '/guide/' }
        ],
        sidebar: {
            '/guide/': [
                {
                    title: '指南',
                    collapsable: false,
                    children: [
                        '',
                        'installation',
                        'quick-start',
                        'dir-tree',
                        'configuration',
                        'create-module',
                        'annotation',
                        'http-server',
                        'component',
                        'database',
                        'websocket-server'
                    ]
                }
            ] 
        },
    }
}
