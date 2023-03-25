import qs from "qs"
import axios from './axiosCustom'

export function getStrapiUrl(path=""){
    return  `${
        process.env.NODE_ENV==='development'?'http://localhost:1337'
        :process.env.REACT_APP_STRAPI_API
    }${path}`
}


export async function axiosAPI(path,method,urlParamsObject={},requestData=null,options={}){

    const queryString=qs.stringify(urlParamsObject)
    const url=`${getStrapiUrl(`/api${path}${queryString?`?${queryString}`:""}`)}`
    const{data,status,statusText}=await axios({method,url,data:requestData},options)

    if(status!==200)
    {
        console.log(statusText)
        throw new Error(`An error occured please try again`)
    }

    return data
}