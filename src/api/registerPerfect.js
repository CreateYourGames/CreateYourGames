import base from './base'
import axios from '../network/request'

let www=base.proxy

const registerPerfect={
    registerPerfect(value){
        console.log(value)
        return axios.post(`${www}/register`,{
            params:value
        })
    }
}

export default registerPerfect