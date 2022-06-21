const express = require("express")
const router = express.Router()
const { addEntrance, addEntranceD, getParkingSlots, addParkingSlot, park, unpark } = require("../controllers/parkingController")

router.route("/")
  .get(getParkingSlots)
  .post(addParkingSlot)
  .put(park)

router.route("/unpark")
  .put(unpark)

router.route("/entrances")
  .post(addEntrance)
  .put(addEntranceD)

module.exports = router