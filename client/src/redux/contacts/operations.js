import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: 'https://connections-api.goit.global'
});

export const apiGetContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;  

      if (!token) {
        return thunkApi.rejectWithValue("No token");
      }
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      const { data } = await instance.get('/contacts');
      return data;

    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
