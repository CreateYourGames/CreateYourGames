import base from './base'  //导入公共的接口域名
import axios from '../network/request'  //导入实例化后的axios
// import qs from 'queryString'

let www=base.proxy  //这里方便了更改域名的话统一修改域名
const gameInfo={
    //这里存放游戏详情页的相关接口
    gameInfoApi(value) {
        return axios.get(`${www}/showGameInfo`,{
            params:value
        })
    },
    //判断用户是否喜欢该游戏
    loveJudge(value){
        return axios.get(`${www}/loveJudge`,{
            params:value
        })
    },
    //发表评论
    comPublish(value){
        return axios.post(`${www}/comPublish`,value)
    },
    //点赞,差评
    goodIncrease(value,num){
        return axios.get(`${www}/goodIncrease?userLoginName=${value}&num=${num}`)
    },
    badIncrease(value,num) {
        return axios.get(`${www}/badIncrease?userLoginName=${value}&num=${num}`)
    },
    //添加到喜欢
    addToLove(value){
        console.log(value)
        return axios.get(`${www}/addToLove`,{
            params:value
        })
    },
    removeLove(value) {
        console.log(value)
        return axios.get(`${www}/removeLove`, {
            params:value
        })
    }
}   
export default gameInfo

