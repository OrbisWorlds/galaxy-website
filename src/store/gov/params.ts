import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { Params } from "../../interfaces/galaxy/gov";

interface InitialState extends Params {
}

const initialState: InitialState = {
    "voting_params": {
        "voting_period": '0s'
    },
    "deposit_params": {
        "min_deposit": [],
        "max_deposit_period": '0s'
    },
    "tally_params": {
        "quorum": "0.000000000000000000",
        "threshold": "0.000000000000000000",
        "veto_threshold": "0.000000000000000000",
    }
}


export const fetchParamsDeposit = createAsyncThunk('vote/fetchParams', async (arg, thunk) => {
    try {
        const response = await api.get('/cosmos/gov/v1beta1/params/deposit')
        const data = response.data as Params;

        return data.deposit_params
    } catch (error) {
        return thunk.rejectWithValue(error)
    }
})


export default createSlice({
    name: 'gov/params',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchParamsDeposit.fulfilled, (state, action) => { state.deposit_params = action.payload })
    }
}).reducer