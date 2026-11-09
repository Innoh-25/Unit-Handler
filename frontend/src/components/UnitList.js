import {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getUnits,reset } from '../features/units/unitSlice'
import UnitItem from './UnitItem'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UnitList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {units,isLoading,isError,message} = useSelector(state=>state.units)

    useEffect(()=>{
        if(isError) toast.error(message)
        dispatch(getUnits())
        return ()=> dispatch(reset())
    },[isError,message,navigate,dispatch])

  return (
    isLoading ? <Spinner/> : (
        <section className="content">
            {units.length > 0 && (
                <div className="units">
                    {units.map(unit=><UnitItem key={unit._id} unit={unit}/>)}
                </div>
            )}
        </section>
    )
  )
}

export default UnitList