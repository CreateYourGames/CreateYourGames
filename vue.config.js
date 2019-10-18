const path = require('path');

module.exports = {
    productionSourceMap: false,
    publicPath: process.env.Node_ENV === 'production' ? '' : './',
    assetsDir: 'assets',
    devServer:{
        proxy: {
            '/double': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': ''
                // }    
            }
        }
    }
   
}