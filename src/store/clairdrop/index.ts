
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { galaxyChainConfig } from "../../constants/chain";
import config from "../../constants/config";
import { Coin } from "../../interfaces";
import { ClaimRecord } from "../../interfaces/galaxy/clairdrop";

interface InitialState {
    eligible: boolean
    totalClaimable: Coin
    claimRecord: ClaimRecord
}

const initialState: InitialState = {
    eligible: false,
    totalClaimable: { denom: config.coinOriginDenom, amount: "0" },
    claimRecord: { address: "", inital_claimable_amount: [], action_completed: [false, false, false, false] },
}



export const fetchTotalClaimable = createAsyncThunk('clairdrop/fetchTotalClaimable', async (address: string, thunk) => {
    try {
        const response = await api.get("/galaxy/clairdrop/total_claimable/" + address)
        const data = (response.data.coins as Coin[])
        return data.filter(x => x.denom === config.coinOriginDenom)[0];
    } catch (error) {
        return thunk.rejectWithValue(error)
    }
})
export const fetchClaimRecord = createAsyncThunk('clairdrop/fetchClaimRecord', async (address: string, thunk) => {
    try {
        const response = await api.get("/galaxy/clairdrop/claim_record/" + address)
        const data = (response.data.claim_record as ClaimRecord)

        return data;
    } catch (error) {
        return thunk.rejectWithValue(error)
    }
})



export default createSlice({
    name: 'clairdrop',
    initialState,
    reducers: {
    },
    extraReducers: builder => {

        builder.addCase(fetchTotalClaimable.fulfilled, (state, action) => {
            if (action.payload) {
                state.totalClaimable = action.payload
            }
        })

        builder.addCase(fetchClaimRecord.fulfilled, (state, action) => {
            state.claimRecord = action.payload;
            state.eligible = action.payload.inital_claimable_amount.length >= 1
        })
    }
}).reducer