import base from './base'
import axios from '../network/request'

let www=base.proxy

const login={
    login(value){
        console.log(value)
        return axios.post(www+'/login',{
            params:value
        })
    },
    // loginJudge(value){
    //     return axios.post(`${www}/loginJudge`,{
    //         params:value
    //     })
    // }

}

export default login