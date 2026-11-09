import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createUnit } from '../features/units/unitSlice'
import { useNavigate } from 'react-router-dom'

const UnitForm = () => {
  const [text,setText] = useState('') 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e)=>{
    e.preventDefault()
    dispatch(createUnit({unit: text}))
    setText('')
    navigate('/allunits')
  }

  const onChange = (e)=>{
    setText(e.target.value)
  }


  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text" style={{fontWeight:'bolder'}}>Unit</label>
          <input type="text" id="text" value={text} placeholder='Enter the name of the unit here' onChange={onChange}/>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type='submit'>Add Unit</button>
        </div>
      </form>
    </section>
  )
}

export default UnitForm