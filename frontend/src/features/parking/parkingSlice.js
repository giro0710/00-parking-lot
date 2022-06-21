import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import parkingService from "./parkingService"

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUnparkSuccess: false,
  message: "",
  parkingSlots: [],
  entrances: []
}

export const getParkingSlots = createAsyncThunk("parking/get", async (_, thunkAPI) => {
  try {
    return await parkingService.getParkingSlots()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
    return thunkAPI.rejectWithValue(message)
  }
})

export const parkVehicle = createAsyncThunk("parking/park", async (data, thunkAPI) => {
  try {
    return await parkingService.parkVehicle(data)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
    return thunkAPI.rejectWithValue(message)
  }
})

export const unparkVehicle = createAsyncThunk("parking/unpark", async (data, thunkAPI) => {
  try {
    return await parkingService.unparkVehicle(data)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
    return thunkAPI.rejectWithValue(message)
  }
})

export const addEntrance = createAsyncThunk("parking/entrance", async (data, thunkAPI) => {
  try {
    return await parkingService.addEntrance(data)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
    return thunkAPI.rejectWithValue(message)
  }
})

export const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.isUnparkSuccess = false
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParkingSlots.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getParkingSlots.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getParkingSlots.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.parkingSlots = action.payload.parkingSlots
        state.entrances = action.payload.entrances
      })
      .addCase(parkVehicle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(parkVehicle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(parkVehicle.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const index = state.parkingSlots.findIndex((e) => e._id === action.payload._id)
        state.parkingSlots[index] = action.payload
      })
      .addCase(unparkVehicle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(unparkVehicle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(unparkVehicle.fulfilled, (state, action) => {
        state.isLoading = false
        state.isUnparkSuccess = true
        const index = state.parkingSlots.findIndex((e) => e._id === action.payload.parkingSlots._id)
        state.parkingSlots[index] = action.payload.parkingSlots
        state.message = action.payload.message
      })
      .addCase(addEntrance.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addEntrance.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addEntrance.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(action.payload)
        const index = state.entrances.findIndex((e) => e._id === action.payload._id)
        state.entrances[index] = action.payload
      })
  }
})

export const { reset } = parkingSlice.actions
export default parkingSlice.reducer