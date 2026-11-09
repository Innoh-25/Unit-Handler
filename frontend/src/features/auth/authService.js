import axios from 'axios'
const API_URL = '/api/students/'

const register = async(studentData) =>{
    const response = await axios.post(API_URL,studentData)
    if(response.data){
        localStorage.setItem('student',JSON.stringify(response.data))
    }

    return response.data
}

const logout = ()=> localStorage.removeItem('student')

const login = async(studentData)=>{
    const response = await axios.post(API_URL+'login',studentData)
    if(response.data){
        localStorage.setItem('student',JSON.stringify(response.data))
    }
    return response.data
}

const authService = { register,logout,login }

export default authService
