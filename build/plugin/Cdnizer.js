/**
 * Created by jialiu on 17/1/4.
 */

"use strict"

const cdnizerFactory = require("cdnizer")

function CdnizerWebpackPlugin(options) {
    // Setup the plugin instance with options...
    this.options = Object.assign({
        qa: false,
        defaultCDNBase: options.defaultCDNBase || '', // 默认cdn
        venderCDNBase: options.venderCDNBase || '//static.xyqb.com/common-lib/',
        relativeRoot: options.relativeRoot || '',
        files: options.files || ['**/*.{gif,png,jpg,jpeg}', '**/*.js', '**/*.css'],
        assetsSubDirectory: options.assetsSubDirectory || 'static'
    }, options);
    this.options.assetsSubDirectory += '/';
}

CdnizerWebpackPlugin.prototype.apply = function (compiler, callback) {
    let cdnizerCss = cdnizerFactory(this.options);
    compiler.plugin('emit', (compilation, callback) => {
        if (this.options.prod === true) {
            for (let filename in compilation.assets) {
                if (new RegExp(/\S+app\S+.js$/g).test(filename)) {
                    let _child = compilation.assets[filename]
                    let jsReg = new RegExp(this.options.assetsSubDirectory + "\\S+?.(png|jpg|jpeg|gif)", 'g');
                    if (_child._value) {
                        _child._value = _child._value.replace(jsReg,
                            (str) => this.options.defaultCDNBase + str
                        )
                    }
                }
                if (new RegExp(/^\S+.css$/g).test(filename)) {
                    let _child = compilation.assets[filename]
                    if (_child.children) {
                        for (let i = 0, j = _child.children.length; i < j; i++) {
                            _child.children[i]._value = cdnizerCss(_child.children[i]._value)
                        }
                    } else {
                        _child._value = cdnizerCss(_child._value)
                    }
                }
            }
            let oldHtml = compilation.assets['index.html'].source(),
                newHtml = cdnizerCss(oldHtml)
            compilation.assets['index.html'] = {
                source: function () {
                    return newHtml;
                },
                size: function () {
                    return newHtml.length;
                }
            };
        }
        callback();
    });
}

module.exports = CdnizerWebpackPlugin;