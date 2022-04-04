import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import api from "../../api/axios";
import { Validator, Pool } from "../../interfaces/galaxy/staking";

interface InitialState extends Pool {
}

const initialState: InitialState = {
    not_bonded_tokens: '0',
    bonded_tokens: "0"
}

export const fetchPool = createAsyncThunk('staking/fetchPool', async () => {
    const response = await api.get("/cosmos/staking/v1beta1/pool")
    const data = response.data;

    const pool = data.pool as Pool
    return pool
})

export default createSlice({
    name: 'staking/pool',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPool.fulfilled, (state, action) => ({
            ...state, ...action.payload
        }))
    }
}).reducer
