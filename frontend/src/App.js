import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getParkingSlots, addEntrance, reset } from "./features/parking/parkingSlice"
import ParkForm from "./components/ParkForm"
import UnparkForm from "./components/UnparkForm"
import ParkingSlot from "./components/ParkingSlot"

function App() {
  const dispatch = useDispatch()

  const { parkingSlots, entrances } = useSelector((state) => state.parking)

  useEffect(() => {
    if (parkingSlots.length === 0) {
      dispatch(getParkingSlots())
    }

    return () => {
      dispatch(reset())
    }
  }, [parkingSlots, dispatch])

  return (
    <>
      <div className="forms">
        <ParkForm />
        <UnparkForm />
      </div>
      
      <div className="top-entrance">
        <h1>B</h1>
      </div>
      <div className="parking-slot">
        <div className="entrance">
          <h1>A</h1>
        </div>
        <div className="slots">
        {
          parkingSlots.map((slot) => {
            return <ParkingSlot key={slot._id} slot={slot} />
          })
        }
        </div>
        <div className="entrance">
          <h1>C</h1>
        </div>
      </div>
      <div className="bottom-entrance">
        { entrances.length > 0 && entrances[3].status ? (
          <h1>D</h1>
        ) : (
          <button onClick={() => dispatch(addEntrance())}>Add Entrance</button>
        )}
        </div>
      
      <ToastContainer />
    </>
  );
}

export default App;
