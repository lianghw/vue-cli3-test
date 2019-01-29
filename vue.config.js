// vue.config.js

var merge = require('webpack-merge')
const fs = require('fs')
const glob = require("glob")
const WebpackAssetsManifest = require('webpack-assets-manifest');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
const path = require('path')

const pages = {}
let entries
try {
    entries = glob('src/pages/*/*.html', {
        sync: true
    })
} catch (err) {
    entries = []
    throw err
}
entries.forEach((file) => {
    const fileSplit = file.split('/')
    pages[fileSplit[2]] = {
        entry: file.replace(/\.html/, '.js'),
        template: file,
        filename: fileSplit[3]
    }
})
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.VUE_APP_BASE_URL_FE,
    assetsDir: 'static/',
    runtimeCompiler: true,
    productionSourceMap: false,
    devServer: {
        host: 'c2c.dev.neigou.com',
        port: 8088,
        proxy: {
            '/topic/api': {
                target: 'http://topic.test.care001.cn',
                changeOrigin: true,
                // ws: true,
                pathRewrite: {
                    // '^/api': ''
                }
            }
        },
        open: process.platform === 'darwin',
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
        config.module
            .rule('css')
            .test(/\.css$/)
            .oneOf('vue')
            .resourceQuery(/\?vue/)
            .use('px2rem')
            .loader('px2rem-loader')
            .options({
                remUnit: 37.5
            })
            .end()
        // config.module
        //     .rule('compile')
        //     .test(/\.jsx?$/)
        //     .use('babel')
        //     .loader('babel-loader')
        //     .options({ presets: ['@babel/preset-env'] });
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                // 修改它的选项... 10KB一下 base64
                options.limit = 10000
                return options
            })

        config.externals({
            ...config.externals,
            'vue': 'Vue'
        })
    },
    css: {
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            postcss: {
                plugins: [require('postcss-px2rem')({
                    remUnit: 37.5
                })]
            }
        }
    },
    configureWebpack: config => {
        // plugins: [
        //     new WebpackAssetsManifest({
        //         entrypoints: true,
        //     })
        // ]
        if(process.env.VUE_APP_ENV=='production'){
            // config.plugins.push(
            //     new UglifyJsPlugin({
            //         uglifyOptions: {
            //             compress: {
            //                 warnings: false,
            //                 drop_debugger: true,
            //                 drop_console: true,
            //             },
            //         },
            //         sourceMap: false,
            //         parallel: true,
            //     })
            // )
        }
        config.plugins.push(
            new WebpackAssetsManifest({
                entrypoints: true,
            })
        )
    },
    pages: pages
}