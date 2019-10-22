const path = require('path');

module.exports = {
    productionSourceMap: false,
    publicPath: process.env.Node_ENV === 'production' ? '' : './',
    assetsDir: 'assets',
    devServer:{
        proxy: {
            '/api': {
                target: 'http://10.110.5.62:3000',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': ''
                // }    
            }
        }
    }
   
}