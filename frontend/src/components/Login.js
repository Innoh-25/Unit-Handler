import {useState,useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset,login } from '../features/auth/authSlice'
import Spinner from './Spinner'



const Login= ()=> {
    const [formData,setFormData] = useState({regNo:'',password:''})
    const {regNo,password} = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {student,isError,isSuccess,message,isLoading} = useSelector(state=>state.auth)

    useEffect(()=>{
        if(isError) toast.error(message)
        if(isSuccess||student) navigate ('/')
        dispatch(reset())
    },[student,isError,isSuccess,message,navigate,dispatch])

    const onChange = (e)=>{
        setFormData(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        const studentData = {regNo,password}
        dispatch(login(studentData))
    }

  return (
    isLoading ? <Spinner/> : (
   <>
    <section className="heading">
        <h1><FaSignInAlt/>Login</h1>
        <p>Please enter your details below to login</p>
    </section>
  
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input className='form-control' type='text' name='regNo' id='regNo' value={regNo} placeholder='Enter your registration no below' onChange={onChange}/>
            </div>
            <div className="form-group">
                <input className='form-control' type='password' name='password' id='password' value={password} placeholder='Enter your password below' onChange={onChange}/>
            </div>
            <div className="form-group">
                <input className='btn btn-block' type='submit' />
            </div>
        </form>
        
    </section>
   </>
    )
  )
}

export default Login