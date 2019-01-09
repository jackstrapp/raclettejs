// karma.conf.js
module.exports = {
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    files: [
        'tests/*.js'
    ],
    preprocessors: {
        'tests/*': ['webpack'],
    },
    singleRun: true,
    webpack: require("./webpack.config")
}
