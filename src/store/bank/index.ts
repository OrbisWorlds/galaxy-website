import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import config from "../../constants/config";
import { Coin } from "../../interfaces/galaxy";

const initialBalances: Coin[] = [
    { denom: config.coinOriginDenom, amount: "0" }
]

interface InitialState {
    balances: Coin[]
}

const initialState: InitialState = {
    balances: initialBalances
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

            //check default
            if (!state.balances.length) {
                state.balances = initialBalances
            }
        })
    }
}).reducer
