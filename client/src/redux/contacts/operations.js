import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://connections-api.goit.global',
    // headers: {
    //     Authorization : `Bearer ${localStorage.getItem('token')}`
    // }
})

export const setToken = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const clearerToken = () => {
    instance.defaults.headers.common.Authorization = ''
}

export const apiGetContacts = createAsyncThunk(
    'contacts/getAll',
    async (_, thunkApi) => {
      try {
        const state = thunkApi.getState();
        const token = state.auth.token;
        if (!token) {
          return thunkApi.rejectWithValue('No auth token');
        }
        setToken(token);
        const { data } = await instance.get('/contacts');
        console.log(data);
        return data;
      } catch (error) {
        return thunkApi.rejectWithValue(
          error.response?.data || error.message
        );
      }
    }
  );

  export const apiAddNewContact = createAsyncThunk(
    'contact/addNew',
    async (formData, thunkApi) => {
      try {
        const {data} = await instance.post('/contacts', formData);
        console.log(data);
        return data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || error.message);
      }
    }
  );  

  export const apiDeleteContact = createAsyncThunk(
    'contact/delete',
    async (contactId, thunkApi) => {
      try {
        const {data} =  await instance.delete(`contacts/${contactId}`);
        return data
      } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || error.message);
      }
    }
  );  