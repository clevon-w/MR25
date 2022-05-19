/**
 * A store is an immutable object tree in Redux. 
 * A store is a state container which holds the application's state.
 * Redux can have only a single store in your application. 
 * Whenever a store is created in Redux, you need to specify the reducer.
 */

import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})