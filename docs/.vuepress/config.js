module.exports = {
    base: '/esl-utils_docs/',
    dest: 'docs/dist',
    title: '常用工具方法',
    description: '开发中常用的工具方法、css等记录',
    themeConfig: {
        nav: [
            { text: '导航栏1', link: 'https://www.baidu.com' },
            {
                text: '包含子项的导航栏',
                items: [
                    { text: '前端', link: 'https://www.atguigu.com/web' },
                    { text: 'Java', link: 'http://www.atguigu.com/kecheng.shtml' },
                    { text: '大数据', link: 'http://www.atguigu.com/bigdata/' }
                ]
            }
        ],
        sidebar: [
            {
                title: '打包自定义工具库', // 标题
                collapsable: false, // 下级列表不可折叠
                children: [ // 下级列表
                    'chapter1/01_发布到npm中央仓库',
                    'chapter1/02_使用自定义工具包',
                ]
            },
            {
                title: 'js',
                collapsable: false,
                children: [
                    'js相关/01_函数相关'
                ]
            }
        ]
    }
}