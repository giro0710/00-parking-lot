const mongoose = require("mongoose")

const parkingSlotSchema = mongoose.Schema({
  name: String,
  size: Number,
  distance: Array,
  isOccupied: Boolean,
  occupier: {
    by: String,
    start: String
  }
})

module.exports = mongoose.model("ParkingSlot", parkingSlotSchema, "parkingSlots")