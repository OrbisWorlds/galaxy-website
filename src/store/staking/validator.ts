import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/axios";
import { Validator, ValidatorImage } from "../../interfaces/galaxy/staking";

interface InitialState {
    validators: Validator[],
    validatorImages: ValidatorImage[]
}

const initialState: InitialState = {
    validators: [],
    validatorImages: []
}

export const fetchValidators = createAsyncThunk('staking/fetchValidators', async (arg, thunk) => {
    const response = await api.get("/cosmos/staking/v1beta1/validators")
    const data = response.data;

    const validators = data.validators as Validator[]

    //hooks
    thunk.dispatch(fetchValidatorsPicture(validators))

    return validators
})


export const fetchValidatorsPicture = createAsyncThunk('staking/fetchValidatorsPicture', async (validators: Validator[], thunk) => {
    //cache to local storage
    const validatorImages: ValidatorImage[] = []




    for await (const validator of validators) {
        const identity = validator.description.identity;
        let src = '';

        if (identity) {
            const cachend =
                localStorage.getItem("galaxy-validator-" + identity)
            if (cachend) {
                src = cachend
            } else {
                try {
                    const response = await axios.get(`https://keybase.io/_/api/1.0/user/lookup.json?fields=pictures&key_suffix=${identity}`)
                    const data = response.data;
                    if (data.them) {
                        const them = data.them[0];
                        src = them?.pictures?.primary?.url || "";
                    }
                } catch (error) {
                    console.log(error)
                }
                localStorage.setItem("galaxy-validator-" + identity, src)
            }
        }


        validatorImages.push({
            operator_address: validator.operator_address,
            src
        })
    }



    return validatorImages;
})

export default createSlice({
    name: 'staking/validator',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchValidators.fulfilled, (state, action) => {
            if (state.validators.length !== action.payload.length) {
                state.validators = action.payload
                    .map(x => ({ ...x, sort: Math.random() })).sort((a, b) => a.sort - b.sort).sort((a, b) => a === b ? 0 : a.jailed ? 1 : -1)
            } else {
                state.validators = action.payload.sort((a, b) => a === b ? 0 : a.jailed ? 1 : -1)
            }
        })

        builder.addCase(fetchValidatorsPicture.fulfilled, (state, action) => {
            state.validatorImages = [...action.payload]
        })

    }
}).reducer
