import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chainConfig } from "../../constants/chain";

interface InitialState {
    connected: boolean;
    address: string,
}

const initialState: InitialState = {
    connected: false,
    address: ""
}

export const connectWallet = createAsyncThunk('wallet/connect', async (arg, { rejectWithValue }) => {
    try {
        if (!window.keplr) {
            throw new Error("Please install keplr extension.");
        }

        if (!window.keplr.experimentalSuggestChain) {
            throw new Error('Please use the recent version of keplr extension.');
        }
        await window.keplr.experimentalSuggestChain(chainConfig)

        await window.keplr.enable(chainConfig.chainId)

        if (!window.getOfflineSigner) {
            throw new Error("Please install keplr extension.");
        }


        const offlineSigner = window.getOfflineSigner(chainConfig.chainId)
        const accounts = await offlineSigner.getAccounts()
        if (!accounts[0]) {
            throw new Error('Please add your key first');
        }

        return accounts[0]
    } catch (err) {
        return rejectWithValue(err)

    }
})



export const disconnectWallet = createAsyncThunk('wallet/disconnect', async (arg, { rejectWithValue }) => { })

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(connectWallet.fulfilled, (state, action) => {
            state.address = action.payload.address;
            state.connected = true
        })
        builder.addCase(disconnectWallet.fulfilled, (state, action) => {
            state.address = ''
            state.connected = false
        })
    }
})
export default walletSlice.reducer