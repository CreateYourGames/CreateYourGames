import base from './base' //导入公共的接口域名
import axios from '../network/request' //导入实例化后的axios

let www = base.proxy //这里方便了更改域名的话统一修改域名

const verify = {
    // 更新手机号
    updatePhone(value) {
        console.log(value);
        return axios.post(`${www}/updatePhone`, value)
    },
    // 发送新旧手机号
    sendToOldPhone(value) {
        console.log(value);
        return axios.post(`${www}/sendSms`, value)
    },
    
    // 验证码：给新邮箱发
    UpdateEmail(value) {
        console.log(value);
        return axios.post(`${www}/updateEmail`, value)
    },
    // 发送账号和新邮箱让其更改数据
    PersonalEmail(value) {
        console.log(value);
        return axios.post(`${www}/sendEmail`, value)
    },

}

export default verify