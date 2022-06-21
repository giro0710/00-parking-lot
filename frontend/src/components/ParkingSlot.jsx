function ParkingSlot({slot}) {
  let size = ""

  if (slot.size === 0) {
    size = "Small"
  } else if (slot.size === 1) {
    size = "Medium"
  } else {
    size = "Large"
  }

  return (
    <div className={slot.isOccupied ? "slot occupied" : "slot"}>
      <h1>{ slot.name }</h1>
      <label>{ size }</label>
    </div>
  )
}

export default ParkingSlot