import base from './base' //导入公共的接口域名
import axios from '../network/request' //导入实例化后的axios


let www = base.proxy //这里方便了更改域名的话统一修改域名
const personal={
    publishGame(value) {
        console.log(value)
        return axios.get(`${www}/personal?userLoginName=${value}`)
    },
    recentGame(value){
        return axios.get(`${www}/personal?userLoginName=${value}`)
    },
    favorGame(value){
        return axios.get(`${www}/personal?userLoginName=${value}`)
    },
    delGame(value){
        return axios.get(`${www}/delgame?gameId=${value}`)
    },

    
    // 修改后的个人信息
    PersonalInfo(value){
        console.log(value);
        return axios.post(`${www}/updateInfo`,value) 
    },

}
export default personal