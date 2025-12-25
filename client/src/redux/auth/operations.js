import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://connections-api.goit.global'
})

export const setToken = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const clearerToken = () => {
    instance.defaults.headers.common.Authorization = ''
}

export const apiRegister = createAsyncThunk('auth/register', async (forData, thunApi) => {
    try {
        const {data} = await instance.post('/users/signup', forData)
        console.log(data);
        setToken(data.token)
        return data
    } catch (error) {
        return thunApi.rejectWithValue(error.message)
    }
})


export const apiLogin = createAsyncThunk('auth/login', async (forData, thunApi) => {
    try {
        const {data} = await instance.post('/users/login', forData)
        console.log(data);
        setToken(data.token)
        return data
    } catch (error) {
        return thunApi.rejectWithValue(error.message)
    }
})