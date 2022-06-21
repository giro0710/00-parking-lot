import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { parkVehicle, reset } from "../features/parking/parkingSlice"

function ParkForm() {
  const [data, setData] = useState({
    plateNumber: "",
    vehicleSize: "0",
    entranceIndex: "0"
  })

  const dispatch = useDispatch()

  const { entrances, isError, message } = useSelector((state) => state.parking)

  const handleFieldChange = (e) => {
    setData((data) => ({
      ...data, [e.target.name] : e.target.value
    }))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    return () => {
      reset()
    }
  }, [isError, message, reset])

  const park = (e) => {
    e.preventDefault()

    if (!data.plateNumber) {
      toast.error("Please define plate number before parking.")
    } else {
      dispatch(parkVehicle(data))
    }
  }

  return (
    <div className="form">
      <h1>Park</h1>
      <form onSubmit={park}>
        <input type="text" name="plateNumber" value={data.plateNumber} onChange={handleFieldChange} placeholder="Plate number"/>
        <select name="vehicleSize" onChange={handleFieldChange}>
          <option value="0">Small</option>
          <option value="1">Medium</option>
          <option value="2">Large</option>
        </select>
        <select name="entranceIndex" onChange={handleFieldChange}>
          {
            entrances.map((entrance, index) => {
              if (entrance.status) {
                return <option key={entrance._id} value={index}>{entrance.name}</option>
              }
            })
          }
        </select>
        <button type="submit">Park</button>
      </form>
    </div>
  )
}

export default ParkForm