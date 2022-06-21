const mongoose = require("mongoose")

const entranceSchema = mongoose.Schema({
  name: String,
  status: Boolean
})

module.exports = mongoose.model("Entrance", entranceSchema, "entrances")