const path = require("path");

module.exports = {
    mode: 'development',
    entry: {
        "index": "./src/index.js"
    },
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["transform-object-rest-spread"]
                    }
                }
            }
        ]
    }
};