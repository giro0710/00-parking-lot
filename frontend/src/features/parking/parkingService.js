import axios from "axios"

const API_URL = "/api/parking/"

const getParkingSlots = async () => {
  const response = await axios.get(API_URL)
  
  return response.data
}

const parkVehicle = async (data) => {
  const response = await axios.put(API_URL, data)

  return response.data
}

const unparkVehicle = async (data) => {
  const response = await axios.put(API_URL + "unpark", data)

  return response.data
}

const addEntrance = async () => {
  const response = await axios.post(API_URL + "entrances")

  return response.data
}

const parkingService = {
  getParkingSlots,
  parkVehicle,
  addEntrance,
  unparkVehicle
}

export default parkingService