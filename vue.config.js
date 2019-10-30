const path = require('path');

module.exports = {
    productionSourceMap: false,
    publicPath: process.env.Node_ENV === 'production' ? '' : './',
    assetsDir: 'assets',
    devServer:{
        proxy: {
            '/api': {
                target: 'http://10.110.5.26:3000',
                // target: 'http://localhost:3000',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': ''
                // }    
            }
        }
    }
   
}