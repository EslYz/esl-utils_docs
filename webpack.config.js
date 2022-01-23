const path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'esl-utils.js',
        // 向外暴露的对象的名称
        library: 'eUtils',
        // 打包生成库可以通过esm/commonjs/reqirejs的语法引入
        libraryTarget: 'umd',
    },
}