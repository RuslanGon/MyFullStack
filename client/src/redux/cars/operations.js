import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchApiCarById, fetchApiCars } from "../../services/api.js";

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

export const apiCarsByQuery = createAsyncThunk(
    "cars/query",
    async (id, thunkApi) => {
      try {
        const data = await fetchApiCarById(id);
        return data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
);