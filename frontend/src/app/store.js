import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import unitReducer from '../features/units/unitSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    units:unitReducer,
  },
});
