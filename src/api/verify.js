import base from './base' //导入公共的接口域名
import axios from '../network/request' //导入实例化后的axios

let www = base.proxy //这里方便了更改域名的话统一修改域名

const verify = {
    // 验证码：给新手机号发
    PersonalPhone(value) {
        console.log(value);
        return axios.post(`${www}/sendSms`, value)
    },
    // 验证码：给新邮箱发
    PersonalEmail(value) {
        console.log(value);
        return axios.post(`${www}/sendEmail`, value)
    },



    // 发送新旧手机号，更新数据
    // personalPhone(value) {
    //     console.log(value);
    //     return axios.get(`${www}/xxx`, value)
    // },
    // // 发送账号和新邮箱让其更改数据
    // personalEmail(value) {
    //     console.log(value);
    //     return axios.get(`${www}/xxx`, value)
    // },

}

export default verify