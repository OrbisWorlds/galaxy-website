import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { claimAllRewards } from "../distribution";
import { delegate, reDelegate, unDelegate } from "../staking";

interface InitialState {
    open: boolean,
}

const initialState: InitialState = {
    open: false,
}

export default createSlice({
    name: 'tx/broadcasting',
    initialState,
    reducers: {
        open(state, action: PayloadAction<string>) {
            state.open = true
        },
        close(state) {
            state.open = false
        },
    },
    extraReducers: builder => {
        builder.addCase(delegate.pending, (state, action) => {
            state.open = true
        })
        builder.addCase(unDelegate.pending, (state, action) => {
            state.open = true
        })
        builder.addCase(reDelegate.pending, (state, action) => {
            state.open = true
        })
        builder.addCase(claimAllRewards.pending, (state, action) => {
            state.open = true
        })

    }
})