import {useEffect, useState} from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import{useNavigate} from 'react-router-dom'
import {register,reset} from '../features/auth/authSlice'
import Spinner from './Spinner'


const Register = ()=> {
    const [formData,setFormData] = useState({fullName:'',regNo:'', email:'', password:'', password2:''})
    const {fullName,regNo,email,password,password2} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isLoading,isSuccess,isError,message} = useSelector(state=>state.auth)

    useEffect(()=>{
        if(isError) toast.error(message)
        if(isSuccess) navigate('/')
        dispatch(reset())
    },[isError,isSuccess,message,navigate,dispatch])

    const onChange = (e)=>{
        setFormData(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const onSubmit =(e)=>{
        e.preventDefault()
        if(password !== password2){
            toast.error('Passwords are different')
        }
        else{
            const studentData = { fullName,regNo,email,password }
            dispatch(register(studentData))
        }
    }

    return (
        isLoading ? <Spinner/> : (
        <>
            <section className="heading">
                <h1><FaUser/> Register</h1>
                <p>Please register here:</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input className='form-control' type='text' name='fullName' id='fullName' value={fullName} placeholder='Kindly enter your full name' onChange={onChange}/>                       
                    </div>
                    <div className="form-group">
                        <input className='form-control' type='text' name='regNo' id='regNo' value={regNo} placeholder='Kindly enter your registration number' onChange={onChange}/>                       
                    </div>
                    <div className="form-group">
                        <input className='form-control' type='email' name='email' id='email' value={email} placeholder='Kindly enter your email address' onChange={onChange}/>                       
                    </div>
                    <div className="form-group">
                        <input className='form-control' type='password' name='password' id='password' value={password} placeholder='Kindly enter your Password' onChange={onChange}/>                       
                    </div>
                    <div className="form-group">
                        <input className='form-control' type='password' name='password2' id='password2' value={password2} placeholder='Kindly re-enter your Password' onChange={onChange}/>                       
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
 )
}

export default Register