// karma.conf.js
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['Chrome'], //['PhantomJS'],
        files: [
            //'tests/simple-domain.UT.js',
            'tests/simple-prodDomain.UT.js'
        ],
        preprocessors: {
            'tests/*': ['webpack'],
        },
        webpack: require("./webpack.config")
    })
}