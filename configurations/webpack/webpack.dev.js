const {HotModuleReplacementPlugin} = require('webpack');
const merge = require('webpack-merge');
const commonWebpack = require("./webpack.common");

module.exports = merge(commonWebpack, {

    mode: 'development',
    output: {
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: commonWebpack.externals.path.src,
        watchContentBase: true,
        port: 8080,
        open: true,
        hot: true,
 
        // proxy: {
        //     '/method': {
        //         target: '',
        //         changeOrigin: true
        //     }
        // }
    },

    plugins: [
        new HotModuleReplacementPlugin()
    ]
});