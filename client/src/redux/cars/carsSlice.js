import { createSlice } from "@reduxjs/toolkit";
import { apiGetCars } from "./operations.js";


const INITIAL_STATE = {
 cars: null, 
 isLoading: false,
isError: false
  };

  const carsSlice = createSlice({
    name: "cars",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => builder
    .addCase(apiGetCars.pending, state => {
      state.isLoading = true
      state.isError = false
    }) 
    .addCase(apiGetCars.fulfilled, (state, action) => {
      state.isLoading = false
      state.products = action.payload.items
    })
    .addCase(apiGetCars.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
   
  });

  export const carsReducer = carsSlice.reducer
  
  