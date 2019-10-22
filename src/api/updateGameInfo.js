import base from './base' //导入公共的接口域名
import axios from '../network/request' //导入实例化后的axios


let www = base.proxy //这里方便了更改域名的话统一修改域名
const updateGameInfo={
    // 根据用户id获取原信息
    updateGameInfo(value){
        console.log("123")  
        return axios.get(`${www}/updateGameInfo?id=${value}`)
    },

    // 修改用户信息
    updateGame(value){
        return axios.post(`${www}/updateGame`,value)
    }

}
export default updateGameInfo