module.exports = {
    base: '/eweb/',
    dest: 'docs/.vuepress/dist',
    title: '记录',
    description: '开发中常用的工具方法、css等记录',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        // nav: [
        //     { text: '导航栏1', link: 'https://www.baidu.com' },
        //     {
        //         text: '包含子项的导航栏',
        //         items: [
        //             { text: '前端', link: 'https://www.atguigu.com/web' },
        //             { text: 'Java', link: 'http://www.atguigu.com/kecheng.shtml' },
        //             { text: '大数据', link: 'http://www.atguigu.com/bigdata/' }
        //         ]
        //     }
        // ],
        sidebar: [
            {
                title: '数据结构',
                collapsable: false,
                children: [
                    'dataStructure/sparseArray',
                    'dataStructure/环形队列',
                    'dataStructure/单向链表',
                    'dataStructure/双向链表',
                    'dataStructure/环形链表',
                    'dataStructure/栈',
                    'dataStructure/逆波兰计算器的实现',
                    'dataStructure/hashTable',
                    'dataStructure/tree/binaryTree',
                    'dataStructure/tree/arrBinaryTree',
                    'dataStructure/tree/threadedBinaryTree',
                    'dataStructure/tree/哈夫曼树',
                ]
            },
            {
                title: '算法笔记',
                collapsable: false,
                children: [
                    'algorithm/NSum问题',
                    'algorithm/前缀和数组',
                    'algorithm/差分数组',
                    'algorithm/二维数组的花式遍历',
                    'algorithm/双指针技巧',
                    'algorithm/滑动窗口',
                    'algorithm/递归',
                    'algorithm/linkedList/链表',
                    'algorithm/sort/排序',
                    'algorithm/dynamicProgramming/动态规划01'
                ]
            },
            {
                title: 'js代码',
                collapsable: false,
                children: [
                    'codeSource/promise/promise',
                    'js相关/pub_sub_event_bus',
                    'js相关/functions',
                ]
            },
            {
                title: '前端基础',
                collapsable: false,
                children: [
                    'record/css',
                    'record/从输入URL到显示页面的过程',
                    'record/http',
                    'record/js01',
                    'record/vue',
                    'record/webpack5'
                ]
            }
        ]
    }
}