// webpack 的基本配置文件，由作者创建，TODO 学习webpack！

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const writeStats = require('./utils/write-stats');

const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');  //webpack 基础渲染模块，固定写法
const webpack_isomorphic_tools_plugin =
    new Webpack_isomorphic_tools_plugin(require('./webpack-isotools-config'))
        .development();

const css_loaders = [
    {
        loader: 'style-loader',
    },
    {
        loader: 'css-loader',
    },
    {
        loader: 'autoprefixer-loader'
    }
]

const scss_loaders = [
    {
        loader: 'css-loader',
    },
    {
        loader: 'autoprefixer-loader'
    },
    {
        loader: 'sass-loader'
    }
]

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/app/Main.js'],   // webpack 在这里生成了两个app入口，生成主程序和引用 babel-polyfill
        vendor: [
            'react',
            'react-dom',
            'react-router',
            '@steemit/steem-js',
            'bytebuffer',
            'immutable',
            'autolinker',
            'pako',
            'remarkable',
            'picturefill'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),    
        // path.resolve([…paths])里的每个参数都类似在当前目录执行一个cd操作，从左到右执行，返回的是最后的当前目录, __dirname 获取当前路径
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].js',
        publicPath: '/assets/'
        // publicPath 指定了输出的文件的静态URL地址，当在浏览器中被引用时。 
        // 例如嵌入的<script>或者<link>标签， 引用的图片等。 
        // 当文件的href或url()不同于他的本地路径时（path所指定的），就会用到publicPath。当你希望在其他的域名或者CDN中使用部分或全部的输出文件时就会非常有用
    },
    module: {
        rules: [
            {test: /\.(jpe?g|png)/, use: 'url-loader?limit=4096'},
            {test: /\.json$/, use: 'json-loader'},
            {test: /\.js$|\.jsx$/, exclude: /node_modules/, use: 'babel-loader'},
            {test: /\.svg$/, use: 'svg-inline-loader'},
            {
                test: require.resolve("blueimp-file-upload"),
                use: "imports?define=>false"
            },
            {
                test: /\.css$/,
                use: css_loaders         
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: scss_loaders
                })
            },
            {
                test: /\.md/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        function () {
            this.plugin('done', writeStats);
        },
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({    
            //CommonsChunkPlugin主要是用来提取第三方库和公共模块，避免首屏加载的bundle文件或者按需加载的bundle文件体积过大，从而导致加载时间过长，着实是优化的一把利器。
           names: 'vendor',
           minChunks: Infinity
        }),
        webpack_isomorphic_tools_plugin,
        new ExtractTextPlugin('[name]-[chunkhash].css')    
        //extract-text-webpack-plugin该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象;首先我先来介绍下这个插件的安装方法:
    ],
    resolve: {
        alias: {
            react: path.join(__dirname, '../node_modules', 'react'),
            assets: path.join(__dirname, '../src/app/assets')
        },
        extensions: ['.js', '.json', '.jsx'],
        modules: [
            path.resolve(__dirname, '../src'),
            'node_modules'
        ]
    },
    externals: {
        newrelic: true
    }
};