import {BASE_URL} from '../constants/baseUrl'

export const signup = async (formData) =>{
    let data = JSON.stringify(formData)
    const response = await fetch(BASE_URL+"signup",{
        method:"POST",
        body:data,
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log(res)
    return res;
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
    localStorage.setItem("data",JSON.stringify(res.token))
    // console.log(res.token)
    // console.log("login",res)
    return res;
}

export const updateProfile = async (formData) =>{
    let data = JSON.stringify(formData)
    const response = await fetch(BASE_URL+"updateUser",{
        method:"PUT",
        body:data,
        headers:{
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem("data")),
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    // console.log("update",res)
    return res;
}

export const userPic = async (data) =>{
    const response = await fetch (BASE_URL+"saveImage" ,{
        method:"POST",
        body:data,
        headers:{
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem("data")) 
        }
    })
    const res = await response.text()
    return res;
}

export const events = async (formData) => {

    let data = JSON.stringify(formData)
    const response = await fetch(BASE_URL+"saveEvent",{
        method:"POST",
        body:data,
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log("RES",res)
    return res;
}

export const eventD = async (formData) =>{
    
        const response = await fetch(BASE_URL+"saveEventD",{
            method:"POST",
            body:formData,
                 })
        const res = await response.json()
        console.log(res)
        return res;
}

export const getEventImg = async (email) =>{
    const response = await fetch(BASE_URL+"getImage/muku@gmail.com",{
        method:"GET",
        
    })
    const res = await response.text()
  return res


}
