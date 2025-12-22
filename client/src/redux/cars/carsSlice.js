import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
 cars: []
  };

  const carsSlice = createSlice({
    name: "cars",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => builder
    
   
  });

  export const carsReducer = carsSlice.reducer
  
  