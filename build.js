/**
 * Created by billin on 15/7/27.
 * ／／
 */

({
    appDir: './',
    baseUrl: './public',
    dir: '../dist',
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        jquery: "./js/lib/jquery.min",
        zepto: "./js/lib/zepto.min"
    },
    shim: {
        zepto:{
            export: "$"
        }
    }
})