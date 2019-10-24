import base from './base'
import axios from '../network/request'

let www=base.proxy
const safety={
    //第一步验证，验证用户是否存在
    judgeUser(value){
        return axios.post(`${www}/judgeUser`, value)
    },
    
    //第二步验证，发送邮箱或者手机验证码进行验证
    sendSms(value){
        return axios.post(`${www}/sendSms`,value)
    },
    sendEmail(value){
        return axios.post(`${www}/sendEmail`,value)
    },
    //第三步验证，设置新的密码
    updatePwd(value){
        return axios.post(`${www}/updatePwd`,value)
    }
}
export default safety