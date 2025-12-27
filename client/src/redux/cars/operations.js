import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchApiCars } from "../../services/api.js";

export const apiGetCars = createAsyncThunk(
  "auth/refresh",
  async (_, thunApi) => {
    try {
      const data = await fetchApiCars();
      return data;
    } catch (error) {
      return thunApi.rejectWithValue(error.message);
    }
  }
);