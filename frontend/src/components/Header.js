import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import{ FaSignOutAlt, FaSignInAlt, FaUser } from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import {reset,logout} from '../features/auth/authSlice'


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const{ student } = useSelector(state=>state.auth)

    const logoutFn = ()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (

    <header className="header">
        <div className="logo">
            <Link to ='/'>Unit Recorder</Link>
        </div>
        <ul>
            {student ? (
                <li>
                    <button className='btn' onClick={logoutFn}>
                        <FaSignOutAlt/> Logout
                    </button>
                </li>
                
            ) : (
            <>
                <li>
                        <Link to="/login">
                            <FaSignInAlt/> Login
                        </Link>
                </li>
                <li>
                    <Link to="/register">
                        <FaUser/> Sign Up
                    </Link>
                </li>
            </>
            )}
            
        </ul>
    </header>
  )
}

export default Header