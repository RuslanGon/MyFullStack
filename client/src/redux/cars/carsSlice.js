import { createSlice } from "@reduxjs/toolkit";
import { apiCarsByQuery, apiGetCars } from "./operations.js";


const INITIAL_STATE = {
 cars: [], 
 isLoading: false,
isError: false,
filter: '',
  };

  const carsSlice = createSlice({
    name: "cars",
    initialState: INITIAL_STATE,
    reducers: {
      setFilter(state, action) {
        state.filter = action.payload;
      }
    },
    extraReducers: (builder) => builder
    .addCase(apiGetCars.pending, state => {
      state.isLoading = true
      state.isError = false
    }) 
    .addCase(apiGetCars.fulfilled, (state, action) => {
      state.isLoading = false
      state.cars = Array.isArray(action.payload.items) ? action.payload.items : []
    })
    .addCase(apiGetCars.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })

    .addCase(apiCarsByQuery.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
  })
  .addCase(apiCarsByQuery.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cars = Array.isArray(action.payload.items) ? action.payload.items : []
  })
  .addCase(apiCarsByQuery.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
  })
   
  });
  export const { setFilter } = carsSlice.actions;
  export const carsReducer = carsSlice.reducer
  
  