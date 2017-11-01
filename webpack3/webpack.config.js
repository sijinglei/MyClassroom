const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //一款js压缩插件
const HtmlPlugin = require('html-webpack-plugin'); //html插件
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //分离css的插件,使样式文件独立存在
const PurifyCSSPlugin = require('purifycss-webpack'); //清楚没用css样式
const CopyWebpackPlugin = require('copy-webpack-plugin');
//模块化
const entry = require('./webpack_config/entry_config.js');

var website = {
    publicPath: ''
}
console.log(encodeURIComponent(process.env.type));
if (process.env.type == 'build') {
    website.publicPath = 'http://192.168.1.114:5000/';
} else {
    website.publicPath = 'http://192.168.1.114:2000/';
}
module.exports = {
    /*
      4中模式：
        1：source-map 生成独立文件  行 列
        2：cheap-moudle-source-map 生成独立文件 不包括列
        3： eval-source-map 在js里面嵌套  行 列 一定是在开发阶段 上线前要删除devtool
        4：cheap-moudle-eval-source-map  行 
    */
    devtool: 'cheap-moudle-eval-source-map', //需要调试的时候用。调试工具
    // entry: entry.path,
    entry: {
        entry: './src/entry.js',
        jquery: 'jquery',
        vue: 'vue'
    }, //入口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: website.publicPath
    }, //出口
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['es2015']
                    // }//这里可以放在babelrc文件中配置，env是最新兼容es6，es7的写法
                },
                exclude: /node_modules/
                    // exclude: /node_modules/,//排除哪些文件夹
                    // loader: 'babel-loader',
                    // query: {
                    //     presets: ['es2015'],
                    //     plugins: ['transform-runtime']
                    // }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader', options: { importLoaders: 1 } },
                            'postcss-loader'
                        ]
                    })
                    //或
                    //loader:['style-loader', 'css-loader']
                    //或
                    // use: [{
                    //             loader: "style-loader"
                    //         },
                    //         {
                    //             loader: "css-loader"
                    //         }
                    //     ]
                    // use: ['style-loader', 'css-loader']
            },
            // { test: /\.(jpg|png)$/, loader: "url?limit=8192" },
            // {
            //   test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            //   loader: 'file'
            //   },
            {
                test: /\.(png|jpg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        outputPath: 'images/'

                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                use: [
                    'html-withimg-loader' //页面配置图片
                ]
            },
            {
                test: /\.less$/,
                //分离打包后的less文件
                use: ExtractTextPlugin.extract({
                        use: [{
                            loader: 'css-loader'
                        }, {
                            loader: 'less-loader'
                        }],
                        fallback: 'style-loader'
                    })
                    // use: [{
                    //     loader: 'style-loader'
                    // }, {
                    //     loader: 'css-loader'
                    // }, {
                    //     loader: 'less-loader'
                    // }]
            },
            {
                test: /\.scss$/,
                //分离打包后的less文件
                use: ExtractTextPlugin.extract({
                        use: [{
                            loader: 'css-loader'
                        }, {
                            loader: 'sass-loader'
                        }],
                        fallback: 'style-loader'
                    }, 'postcss-loader')
                    // use: [{
                    //     loader: 'style-loader'
                    // }, {
                    //     loader: 'css-loader'
                    // }, {
                    //     loader: 'sass-loader'
                    // }]
            }
        ]
    }, //模块
    plugins: [
        //抽离单个插件
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'jquery', //入口那里的jquery
        //     filename: 'assets/js/jquery.min.js',
        //     minChunks: 2 //最小抽离几个文件，一般2就够了
        // }),
        //如果多个，多入口抽离
        new webpack.optimize.CommonsChunkPlugin({
            name: ['jquery', 'vue'], //入口那里的jquery
            filename: 'assets/js/[name].js',
            minChunks: 2 //最小抽离几个文件，一般2就够了
        }),
        //第三方插件
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin("/css/index.css"),
        // new ExtractTextPlugin('[name].css'),//在那个js文件引用就生成对应文件名的css文件
        //new UglifyJsPlugin(),
        new HtmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        //清楚没用css样式插件
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        new webpack.BannerPlugin('版权所有'),
        //静态资源复制插件
        new CopyWebpackPlugin([{
            from: __dirname + '/src/public',
            to: './public'
        }])
    ], //插件
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), //路径
        host: '192.168.1.114',
        compress: true,
        port: 2000
    }, //服务
    //热更新配置
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_modules/
    }
}