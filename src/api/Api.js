import {BASE_URL} from '../constants/baseUrl'
import axios from 'axios'
import {headers} from './Headers'
export const signup = async (formData) =>{
    console.log("FormData",formData)
    const res = await axios.post(BASE_URL+"signup",{
        formData
    },{
        headers
    })
    console.log(res)
}