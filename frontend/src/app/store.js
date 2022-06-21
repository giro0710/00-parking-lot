import { configureStore } from '@reduxjs/toolkit';
import parkingSlice from '../features/parking/parkingSlice';

export const store = configureStore({
  reducer: {
    parking: parkingSlice
  },
});
