const webpack = require("webpack");
const rm = require('rimraf')
const ora = require('ora');
const path = require('path')
const chalk = require('chalk');
const spinner = ora({
    color: 'green',
    text: '正为生产环境打包，耐心点，不然自动关机。。。'
})
spinner.start()

rm(path.resolve(__dirname, '../dist/js'), (err) => {
    if (err) throw err
    webpack({
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, '../dist/js'),
            filename: 'ziksang.js',
        },
        plugins: [
            new webpack.DefinePlugin({
                LOCAL_ROOT: JSON.stringify("http://ziksang.com")
            })
        ]
    }, (err, stats) => {
        spinner.stop()
        if (err) throw err
        console.log(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n')
            // style a string 
        console.log(chalk.blue('好消息！'));

        // compose multiple styles using the chainable API 
        console.log(chalk.blue.bgRed.bold(' 代码已经打包成功，上线吧'));
    })
})