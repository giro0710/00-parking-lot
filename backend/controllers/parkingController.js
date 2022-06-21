const asyncHandler = require("express-async-handler")
const ParkingSlots = require("../models/parkingModel")
const Entrances = require("../models/entranceModel")

let parkingSlots = [
  {
    _id: 0,
    name: "A1",
    size: 0,
    distance: [0, 0, 24, 18],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 1,
    name: "A2",
    size: 0,
    distance: [3, 1, 21, 19],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 2,
    name: "A3",
    size: 0,
    distance: [6, 2, 18, 20],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 3,
    name: "A4",
    size: 1,
    distance: [9, 3, 15, 21],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 4,
    name: "A5",
    size: 1,
    distance: [12, 4, 12, 22],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 5,
    name: "A6",
    size: 1,
    distance: [15, 5, 9, 23],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 6,
    name: "A7",
    size: 2,
    distance: [18, 6, 6, 24],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 7,
    name: "A8",
    size: 2,
    distance: [21, 7, 3, 25],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 8,
    name: "A9",
    size: 2,
    distance: [24, 8, 0, 26],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 9,
    name: "B1",
    size: 0,
    distance: [1, 9, 25, 9],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 10,
    name: "B2",
    size: 0,
    distance: [4, 10, 22, 10],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 11,
    name: "B3",
    size: 0,
    distance: [7, 11, 19, 11],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 12,
    name: "B4",
    size: 1,
    distance: [10, 12, 16, 12],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 13,
    name: "B5",
    size: 1,
    distance: [13, 13, 13, 13],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 14,
    name: "B6",
    size: 1,
    distance: [16, 14, 10, 14],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 15,
    name: "B7",
    size: 2,
    distance: [19, 15, 7, 15],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 16,
    name: "B8",
    size: 2,
    distance: [22, 16, 4, 16],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 17,
    name: "B9",
    size: 2,
    distance: [25, 17, 1, 17],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 18,
    name: "C1",
    size: 0,
    distance: [2, 18, 26, 0],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 19,
    name: "C2",
    size: 0,
    distance: [5, 19, 23, 1],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 20,
    name: "C3",
    size: 0,
    distance: [8, 20, 20, 2],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 21,
    name: "C4",
    size: 1,
    distance: [11, 21, 17, 3],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 22,
    name: "C5",
    size: 1,
    distance: [14, 22, 14, 4],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 23,
    name: "C6",
    size: 1,
    distance: [17, 23, 11, 5],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 24,
    name: "C7",
    size: 2,
    distance: [20, 24, 8, 6],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 25,
    name: "C8",
    size: 2,
    distance: [23, 25, 5, 7],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  },
  {
    _id: 26,
    name: "C9",
    size: 2,
    distance: [26, 26, 2, 8],
    isOccupied: false,
    occupier: {
      by: "",
      start: ""
    }
  }
]

const flatRate = 40
const exceedingRate = [20, 60, 100]
let entrances = [
  {
    _id: 0,
    name: "Entrance A",
    status: 1
  },
  {
    _id: 1,
    name: "Entrance B",
    status: 1
  },
  {
    _id: 2,
    name: "Entrance C",
    status: 1
  },
  {
    _id: 3,
    name: "Entrance D",
    status: 0
  }
]

const park = (req, res) => {
  const { plateNumber, vehicleSize, entrance } = req.body

  if (!plateNumber) {
    res.status(400)
    throw new Error("Please define plate number before parking.")
  }

  if (!vehicleSize) {
    res.status(400)
    throw new Error("Please define vehicle size before parking.")
  }

  if (!entrance) {
    res.status(400)
    throw new Error("Please define entrance before parking.")
  }
  
  for (let i = 0; i < parkingSlots.length; i++) {
    for (let x = 0; x < parkingSlots.length; x++) {
      if (parkingSlots[x].distance[parseInt(entrance)] === i && !parkingSlots[x].isOccupied) {
        if (parseInt(vehicleSize) <= parkingSlots[x].size) {
          parkingSlots[x].isOccupied = true
          parkingSlots[x].occupier = { 
            by: plateNumber,
            start: new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" })
          }
          lastIndex = x
          res.status(200).json(parkingSlots[x])
          return true
        }
      }
    }
  }

  res.status(400)
  throw new Error("Parking lot is currently fool.") 
}

const timeDiff = (end, start) => {
  let diff = (end.getTime() - start.getTime()) / 1000
  diff /= 60 * 60
  return Math.abs(Math.round(diff))
}

const unpark = (req, res) => {
  const { name } = req.body

  let totalDue = 0

  for (let i = 0; i < parkingSlots.length; i++) {
    if (parkingSlots[i].name === name.toUpperCase().trim()) {
      console.log("hey")
      let hoursDue = timeDiff(new Date(), new Date(parkingSlots[i].occupier.start))

      if (hoursDue <= 3) {
        totalDue = flatRate
      } else if (hoursDue > 3 && hoursDue < 24) {
        totalDue = totalDue + flatRate + ((hoursDue - 3) * exceedingRate[arkingSlots[i].size])
      } else if (hoursDue >= 24) {
        totalDue = ((hoursDue / 24) * 5000) + ((hoursDue - ((hoursDue / 24) * 24)) * exceedingRate[arkingSlots[i].size])
      }

      parkingSlots[i].isOccupied = false
      parkingSlots[i].occupier = {
        by: "",
        start: ""
      }

      res.status(200).json({ 
        parkingSlots: parkingSlots[i],
        message: `Total Amount Due: ${totalDue}` 
      })
      return true
    }
  }

  res.status(400)
  throw new Error("Parking slot doesn't exist. Please check your entry.")
}

const getParkingSlots = asyncHandler(async (req, res) => {
  res.status(200).json({ parkingSlots, entrances })
})

const addEntrance = (req, res) => {
  entrances[3].status = 1 
  res.status(200).json(entrances[3])
}

module.exports = {
  park,
  unpark,
  getParkingSlots,
  addEntrance
}