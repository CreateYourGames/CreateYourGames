import base from './base'  //导入公共的接口域名
import axios from '../network/request'  //导入实例化后的axios


let www=base.proxy  //这里方便了更改域名的话统一修改域名
const gameInfo={
    //这里存放游戏详情页的相关接口
    gameInfoApi(value) {
        return axios.get(`${www}/showGameInfo?id=${value}`)
    }
   
}   
export default gameInfo

