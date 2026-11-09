import { useDispatch } from "react-redux"
import { deleteUnit } from '../features/units/unitSlice'

const UnitItem = ({ unit }) => {
    const dispatch = useDispatch()

  return (
    <div className='unit'>
        <div>
            {new Date(unit.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{unit.unit}</h2>
        <button className="close" onClick={()=>dispatch(deleteUnit(unit._id))}>X</button>
    </div>
  )
}

export default UnitItem