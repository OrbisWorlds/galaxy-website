import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { claimAllRewards } from "../distribution";
import { delegate, unDelegate } from "../staking";

interface InitialState {
    open: boolean,
    message: string
}

const initialState: InitialState = {
    open: false,
    message: ""
}


export default createSlice({
    name: 'tx/failed',
    initialState,
    reducers: {
        open(state, action: PayloadAction<string>) {
            state.message = action.payload
            state.open = true
        },
        close(state) {
            state.message = ''
            state.open = false
        },
    },
    extraReducers: builder => {
        builder.addCase(claimAllRewards.rejected, (state, action) => {
            state.open = true;
            state.message = (action.payload as Error).message
        })
        builder.addCase(unDelegate.rejected, (state, action) => {
            state.open = true;
            state.message = (action.payload as Error).message
        })
        builder.addCase(delegate.rejected, (state, action) => {
            state.open = true;
            state.message = (action.payload as Error).message
        })
    }
})
