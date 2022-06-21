import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { unparkVehicle, reset } from "../features/parking/parkingSlice"

function UnparkForm() {
  const [name, setName] = useState("")

  const dispatch = useDispatch()

  const { isUnparkSuccess, message } = useSelector((state) => state.parking)

  useEffect(() => {
    if (isUnparkSuccess) {
      toast.success(message)
    }

    return () => {
      dispatch(reset())
    }
  }, [isUnparkSuccess, message, reset, dispatch])

  const unpark = (e) => {
    e.preventDefault()

    const data = {
      name
    }

    dispatch(unparkVehicle(data))
  }

  return (
    <div className="form">
      <h1>Unpark</h1>
      <form onSubmit={unpark}>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Parking slot name here."/>
        <button type="submit">Unpark</button>
      </form>
    </div>
  )
}

export default UnparkForm