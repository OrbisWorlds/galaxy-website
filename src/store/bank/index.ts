import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { Coin } from "../../interfaces/galaxy";

interface InitialState {
    balances: Coin[]
}

const initialState: InitialState = {
    balances: []
}



export const fetchBalances = createAsyncThunk('bank/balances', async (address: string) => {
    const response = await api.get("/cosmos/bank/v1beta1/balances/" + address)
    const data = response.data;

    const balances = data.balances as Coin[]
    return balances
})

export default createSlice({
    name: 'bank/balances',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBalances.fulfilled, (state, action) => {
            state.balances = action.payload
        })
    }
}).reducer
