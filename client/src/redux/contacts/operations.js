import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://connections-api.goit.global'
})

export const apiGetContacts = createAsyncThunk('getAll/contacts', async (_, thunApi) => {
    try {
        const {data} = await instance.get('/contacts')
        console.log(data);
        return data
    } catch (error) {
        return thunApi.rejectWithValue(error.message)
    }
})