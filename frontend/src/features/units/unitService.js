import axios from "axios";

const API_URL = '/api/units/'

const createUnit = async(unitData,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL,unitData,config)
    return response.data
}

const getUnits = async(token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL,config)
    return response.data
}

const deleteUnit = async(id,token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL+id,config)
    return response.data

}

const unitService = {createUnit,getUnits,deleteUnit}

export default unitService
