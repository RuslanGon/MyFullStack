import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
  isSignedIn: false,
  userData: null,
  token: null,
  isLoading: false,
  isError: false
  };

  const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => builder
    
   
  });

  export const authReducer = authSlice.reducer
  
  