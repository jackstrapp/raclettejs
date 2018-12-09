// karma.conf.js
module.exports = {
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    files: [
        'tests/simple-domain.UT.js'
    ],
    preprocessors: {
        'tests/*': ['webpack'],
    },
    singleRun: true,
    webpack: require("./webpack.config")
}
