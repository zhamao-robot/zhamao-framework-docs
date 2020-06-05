module.exports = {
    title: '炸毛框架',
    description: '协程、高性能、多平台的 CQHTTP 框架',
    markdown: {
        lineNumbers: true
    },
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#5546a3' }],
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
            { text: '指南', link: '/guide/' },
            { text: '进阶', link: '/advanced/' },
            { text: 'FAQ', link: '/FAQ.md' },
            { text: '更新日志', link: '/update.md' }
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
                        'context',
                        'http-server',
                        'database',
                        'websocket-server',
                        'debugger'
                    ]
                },
                {
                    title: '注解事件',
                    collapsable: false,
                    children: [
                        'event/',
                        'event/CQ',
                        'event/swoole',
                        'event/module',
                        'event/middleware'
                    ]
                },
                {
                    title: '框架组件',
                    collapsable: false,
                    children: [
                        'component/',
                        'component/zmrobot',
                        'component/cqapi',
                        'component/cqcode',
                        'component/data-provider',
                        'component/console',
                        'component/zmutil',
                        'component/zmbuf',
                        'component/save-buffer',
                        'component/zmrequest',
                        'component/zmwebsocket'
                    ]
                }
            ],
            '/advanced/': [
                {
                    title: '进阶',
                    collapsable: false,
                    children: [
                        ''
                    ]
                }
            ]
        },
    }
}
