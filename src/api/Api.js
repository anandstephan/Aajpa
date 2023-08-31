import {BASE_URL} from '../constants/baseUrl'

export const signup = async (formData) =>{

    let data = JSON.stringify(formData)
    console.log(data)
    const response = await fetch(BASE_URL+"signup",{
        method:"POST",
        body:data,
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log(res)
}

export const login = async (email,password) =>{
    let data = JSON.stringify({email,password})
    const response = await fetch(BASE_URL+"login",{
        method:"POST",
        body:data,
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log("res",res)
    localStorage.setItem("data",res.token)
    console.log(res.token)
    console.log("login",res)
}

export const updateProfile = async (formData) =>{
    let data = JSON.stringify(formData)
    const response = await fetch(BASE_URL+"updateUser",{
        method:"PUT",
        body:data,
        headers:{
            'Authorization': "Bearer " + localStorage.getItem("data"),
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log("update",res)
}

export const userPic = async (data) =>{
    console.log(data)
    const response = await fetch ("http://192.168.29.52:8080/updateUser1",{
        method:"POST",
        body:data,
        headers:{
            'Authorization': "Bearer " + localStorage.getItem("data"),

        }
    })
    const res = await response.text()
    console.log("update",res)
}