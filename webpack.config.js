const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    // 模式，现在的模式是开发模式，不会混淆、压缩代码，这样打包速度快
    mode: 'development',
    // 入口，告诉webpack从哪里开始打包
    entry: './app/main.js',
    // 出口，告诉webpack打包到哪里
    output: {
        // 虚拟打包路径，现在是xuni
        publicPath: 'xuni',
        // 文件名，打包生成什么文件名
        filename: 'bundle.js'
    },
    // 模块，就是一些额外配置
    module: {
        // 规则
        rules: [
            {
                // 这个正则式表示以less结尾的文件，要经过那些loader
                test: /\.less$/,
                // 使用这些loader
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin()
    ]
};