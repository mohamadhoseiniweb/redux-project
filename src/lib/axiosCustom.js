import axios from 'axios'
import {errorMessage} from '../utils/notification'

const customAxios= axios.create({
    headers:{
        "Content-Type":'application/json'
    }
})


customAxios.interceptors.response.use(response=>response,
    error=>{
        if(error.response.status===401)
           errorMessage('شما اجازه دسترسی به این بخش را ندارید')
        
        else if(error.response.status===0)
           errorMessage('ارتباط با سرور برقرار نیست.')
        
        else
           errorMessage('خطایی در سمت سرور رخ داده است')
})

export default customAxios