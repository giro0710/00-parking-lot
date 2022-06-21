const express = require("express")
const router = express.Router()
const { addEntrance, getParkingSlots, park, unpark } = require("../controllers/parkingController")

router.route("/")
  .get(getParkingSlots)
  .put(park)

router.route("/unpark")
  .put(unpark)

router.route("/entrances")
  .post(addEntrance)

module.exports = router