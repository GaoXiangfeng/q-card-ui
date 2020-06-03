var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HashedModuleIdsPlugin = require('./plugin/HashedModuleIdsPlugin')
var ChunkIdsGenByName = require('./plugin/ChunkIdsGenByName')
var env = config.qa.env

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({
            sourceMap: false,
            extract: true
        })
    },
    devtool: false,
    output: {
        path: config.qa.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: false,
            extract: true
        })
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.qa.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: false,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: function (chunk1, chunk2) {
                var order = ['manifest', 'libs', 'vendor', 'app'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),
        new ChunkIdsGenByName(),
        new HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'libs'],
            minChunks: function (module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0 && !isRepeat(module.resource)
                )
            },
            chunks: ['app']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor', 'libs']
        })
    ]
})

function isRepeat(p) {
    var re = new RegExp(path.join(__dirname, '../node_modules/') + '(' + webpackConfig.entry.libs.join('|') + ')/', 'i');
    return re.test(p)
}

module.exports = webpackConfig