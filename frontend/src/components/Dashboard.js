import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UnitForm from './UnitForm'

function Dashboard() {
  const navigate = useNavigate()
  const {student} = useSelector(state=>state.auth)

  useEffect(()=>{
    if(!student) navigate('/login')
  },[student,navigate])

  return (
    <>
      <section className="heading">
          <h1>Welcome {student?.fullName}</h1>
          <div style={{display:'flex',justifyContent:'center'}}>
              <button className="btn" onClick={()=>navigate('/allunits')}>Check Units</button>
          </div>
      </section>
      <UnitForm/>
    </>
  )
}

export default Dashboard