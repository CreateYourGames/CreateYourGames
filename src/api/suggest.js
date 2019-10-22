import base from './base' //导入公共的接口域名
import axios from '../network/request' //导入实例化后的axios

let www = base.proxy; //这里方便了更改域名的话统一修改域名
const submitSuggest = {
    // 获取用户信息
    submitSuggest(value) {
        return axios.post(`${www}/suggest`,value);
    },
}
export default submitSuggest
