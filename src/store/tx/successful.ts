import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { claimAllRewards } from "../distribution";
import { delegate, reDelegate, unDelegate } from "../staking";

interface InitialState {
    open: boolean,
    transactionHash: string
}

const initialState: InitialState = {
    open: false,
    transactionHash: ""
}

export default createSlice({
    name: 'tx/successful',
    initialState,
    reducers: {
        open(state, action: PayloadAction<string>) {
            state.transactionHash = action.payload
            state.open = true
        },
        close(state) {
            state.transactionHash = ''
            state.open = false
        },
    },
    extraReducers: builder => {
        builder.addCase(claimAllRewards.fulfilled, (state, action) => {
            state.open = true;
            state.transactionHash = action.payload.transactionHash
        })
        builder.addCase(unDelegate.fulfilled, (state, action) => {
            state.open = true;
            state.transactionHash = action.payload.transactionHash
        })
        builder.addCase(reDelegate.fulfilled, (state, action) => {
            state.open = true;
            state.transactionHash = action.payload.transactionHash
        })
        builder.addCase(delegate.fulfilled, (state, action) => {
            state.open = true;
            state.transactionHash = action.payload.transactionHash
        })

    }
})