import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice.js";
import { carsReducer } from "./cars/carsSlice.js";


export const store = configureStore({
    reducer: {
      auth: authReducer,
      cars: carsReducer
    }
});