import base from './base'
import axios from '../network/request'

let www=base.proxy

const login={
    login(value){
        console.log(value)
        return axios.get(www+'/login',{
            params:value
        })
    }

}

export default login