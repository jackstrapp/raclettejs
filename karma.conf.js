// karma.conf.js
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['Chrome'], //['PhantomJS'],
        files: [
            'tests/simple-domain.UT.js'
        ],
        preprocessors: {
            // add webpack as preprocessor
            'tests/simple-domain.UT.js': ['webpack']
        },
        webpack: require("./webpack.config")
        // {
        //     module: {
        //         rules: [
        //             { test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015' }
        //         ]
        //     },
        //     watch: true
        // }
    })
}