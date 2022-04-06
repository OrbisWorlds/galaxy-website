import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { Validator } from "../../interfaces/galaxy/staking";

interface InitialState {
    validators: Validator[]
}

const initialState: InitialState = {
    validators: []
}

export const fetchValidators = createAsyncThunk('staking/fetchValidators', async () => {
    const response = await api.get("/cosmos/staking/v1beta1/validators")
    const data = response.data;

    const validators = data.validators as Validator[]
    return validators
})

export default createSlice({
    name: 'staking/validator',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchValidators.fulfilled, (state, action) => {
            state.validators = [...action.payload]
        })
    }
}).reducer
