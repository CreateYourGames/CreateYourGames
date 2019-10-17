import axios from 'axios'

export function request(config) {
    //因为时封装好的axios 本来就是一个promise对象 这里不用自己再去写then,catch方法了
    const instance1 = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 5000
    })

    // instance1.interceptors.response.use(res=>{
    //     //这里值返回前端需要的data数据
    //     // console.log("来到了拦截响应")
    //     return res.data
    // },err=>{
    //     console.log(err)
    // })
    return instance1(config)
}