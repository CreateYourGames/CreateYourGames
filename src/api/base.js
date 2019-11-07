const base={
    //上线的网址
    prod:'http://121.40.245.126:3000/api',
    //开发时的网址
    dev:'http:10.110.5.21:3000',
    //这里在vue.config.js中做了跨域设置，代理名字是什么这里写什么
    proxy: 'http://121.40.245.126:3000/api'
    // proxy:'/api'
}
export default base