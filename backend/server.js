const path = require("path")
const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./configs/db")
const { errorHandler } = require("./middlewares/errorHandler")

const port = process.env.PORT || 8000

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/parking", require("./routes/parkingRoutes"))

app.use(errorHandler)

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html")))
} else {
  app.get("/", (req, res) => res.send("Please set environment to production."))
}

app.listen(port , () => {
  console.log(`00 Parking Lot server is started at port ${port}`)
})