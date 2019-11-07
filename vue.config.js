const path = require('path');

module.exports = {
    productionSourceMap: false,
    publicPath: process.env.Node_ENV === 'production' ? '' : './',
    assetsDir: 'assets',
    // devServer:{
    //     proxy: {
    //         '/api': {
    //             target: 'http://121.40.245.126:3000',
    //             // target: 'http://localhost:3000',
    //             changeOrigin: true,
    //             // pathRewrite: {
    //             //     '^/api': ''
    //             // }
    //         }
    //     }
    // }
   
}