const asyncHandler = require("express-async-handler")
const ParkingSlot = require("../models/parkingModel")
const Entrance = require("../models/entranceModel")

const flatRate = 40
const exceedingRate = [20, 60, 100]

const park = asyncHandler(async (req, res) => {
  const { plateNumber, vehicleSize, entranceIndex } = req.body

  const parkingSlots = await ParkingSlot.find()

  if (!plateNumber) {
    res.status(400)
    throw new Error("Please define plate number before parking.")
  }

  if (!vehicleSize) {
    res.status(400)
    throw new Error("Please define vehicle size before parking.")
  }

  if (!entranceIndex) {
    res.status(400)
    throw new Error("Please define entrance before parking.")
  }
  
  for (let i = 0; i < parkingSlots.length; i++) {
    for (let x = 0; x < parkingSlots.length; x++) {
      if (parkingSlots[x].distance[parseInt(entranceIndex)] === i && !parkingSlots[x].isOccupied) {
        if (parseInt(vehicleSize) <= parkingSlots[x].size) {
          const updatedData = {
            name: parkingSlots[x].name,
            size: parkingSlots[x].size,
            distance: parkingSlots[x].distance,
            isOccupied: true,
            occupier: { 
              by: plateNumber,
              start: new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" })
            }
          }

          const updatedParkingSlot = await ParkingSlot.findByIdAndUpdate(parkingSlots[x]._id, updatedData, { new: true })
          
          res.status(200).json(updatedParkingSlot)
          return true
        }
      }
    }
  }

  res.status(400)
  throw new Error("Parking lot is currently fool.") 
})

const timeDiff = (end, start) => {
  let diff = (end.getTime() - start.getTime()) / 1000
  diff /= 60 * 60
  return Math.abs(Math.round(diff))
}

const unpark = asyncHandler(async (req, res) => {
  const { name } = req.body

  const parkingSlots = await ParkingSlot.find()

  let totalDue = 0

  for (let i = 0; i < parkingSlots.length; i++) {
    if (parkingSlots[i].name === name.toUpperCase().trim()) {
      if (!parkingSlots[i].isOccupied) {
        res.status(400)
        throw new Error("No vehicle parked in the given parking slot.")
      }

      let hoursDue = timeDiff(new Date(), new Date(parkingSlots[i].occupier.start))

      if (hoursDue <= 3) {
        totalDue = flatRate
      } else if (hoursDue > 3 && hoursDue < 24) {
        totalDue = totalDue + flatRate + ((hoursDue - 3) * exceedingRate[parkingSlots[i].size])
      } else if (hoursDue >= 24) {
        totalDue = ((hoursDue / 24) * 5000) + ((hoursDue - ((hoursDue / 24) * 24)) * exceedingRate[parkingSlots[i].size])
      }

      const updatedData = {
        name: parkingSlots[i].name,
        size: parkingSlots[i].size,
        distance: parkingSlots[i].distance,
        isOccupied: false,
        occupier: { 
          by: "",
          start: ""
        }
      }

      const updatedEntrance = await ParkingSlot.findByIdAndUpdate(parkingSlots[i]._id, updatedData, { new: true })
      
      res.status(200).json({ 
        parkingSlots: updatedEntrance,
        message: `Total Amount Due: ${totalDue}` 
      })
      return true
    }
  }

  res.status(400)
  throw new Error("Parking slot doesn't exist. Please check your entry.")
})

const getParkingSlots = asyncHandler(async (req, res) => {
  const parkingSlots = await ParkingSlot.find()
  const entrances = await Entrance.find()
  res.status(200).json({ parkingSlots, entrances })
})

const addEntrance = asyncHandler(async (req, res) => {
  const { name, status } = req.body

  if (!name || !status) {
    res.status(400)
    throw new Error("Please fill all necessary fields.")
  }

  const entrance = await Entrance.create({
    name,
    status
  })

  res.status(200).json(entrance)
})

const addEntranceD = asyncHandler(async (req, res) => {
  const { _id, name, status } = req.body

  const updatedData = {
    name,
    status: true
  }

  const updatedEntrance = await Entrance.findByIdAndUpdate(_id, updatedData, { new: true })
  console.log(updatedEntrance)
  res.status(200).json(updatedEntrance)
})

const addParkingSlot = asyncHandler(async (req, res) => {
  const { name, size, distance, isOccupied, occupier } = req.body

  if (!req.body) {
    res.status(400)
    throw new Error("Please fill all necessary fields.")
  }

  const parkingSlot = await ParkingSlot.create({
    name,
    size,
    distance,
    isOccupied,
    occupier
  })

  res.status(201).json(parkingSlot)
})

module.exports = {
  park,
  unpark,
  getParkingSlots,
  addParkingSlot,
  addEntrance,
  addEntranceD
}