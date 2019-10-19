const base={
    //上线的网址
    prod:'',
    //开发时的网址
    dev:'http:localhost:3000',
    //这里在vue.config.js中做了跨域设置，代理名字是什么这里写什么
    proxy:'/api'
}
export default base