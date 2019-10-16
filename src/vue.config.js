const path = require('path');

module.exports = {
    productionSourceMap: false,
    publicPath: process.env.Node_ENV === 'production' ? '' : './',
    assetsDir: 'assets',
}