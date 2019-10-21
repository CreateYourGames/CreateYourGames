import base from './base'  //导入公共的接口域名
import axios from '../network/request'  //导入实例化后的axios


let www=base.proxy  //这里方便了更改域名的话统一修改域名
const developerTest={
    //这里存放游戏详情页的相关接口
    developerTest(value) {
        return axios.get(`${www}/updateUserFlag`,{
            params:value
        })
    },
    // registerJudge(value){
    //     return axios.post(`${www}/registerJudge`,{
    //         params:value
    //     })
    // }
   
}   
export default developerTest