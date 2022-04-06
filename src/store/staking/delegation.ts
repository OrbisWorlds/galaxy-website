import { assertIsDeliverTxSuccess, SigningStargateClient } from "@cosmjs/stargate";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { galaxyChainConfig } from "../../constants/chain";
import { Validator } from "../../interfaces/galaxy/staking";
import { DelegateParams, Delegation } from "../../interfaces/galaxy/staking/delegation";
import { fetchBalances } from "../bank";
import { fetchRewards } from "../distribution";
import { fetchPool } from "./pool";
import { fetchValidators } from "./validator";

interface InitialState {
    delegations: Delegation[],
    validators: Validator[]
    totalStaked: number
}

const initialState: InitialState = {
    delegations: [],
    validators: [],
    totalStaked: 0,
}

export const delegate = createAsyncThunk('staking/delegate', async ({ address, validatorAddress, amount }: DelegateParams, thunk) => {
    try {
        if (!window.keplr || !window.getOfflineSigner) {
            throw new Error("Please install keplr extension.")
        }
        await window.keplr.enable(galaxyChainConfig.chainId);
        const offlineSigner = window.getOfflineSigner(galaxyChainConfig.chainId);

        const client = await SigningStargateClient.connectWithSigner(
            galaxyChainConfig.rpc,
            offlineSigner,
        )

        const result = await client.signAndBroadcast(
            address,
            [{
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: {
                    delegatorAddress: address,
                    validatorAddress: validatorAddress,
                    amount
                }
            }],
            {
                gas: "1800000",
                amount: [{ denom: "uglx", amount: "2000" }]
            },
            ""
        )
        assertIsDeliverTxSuccess(result)
        thunk.dispatch(fetchDelegations(address))
        thunk.dispatch(fetchBalances(address))
        thunk.dispatch(fetchDelegationValidators(address))
        thunk.dispatch(fetchRewards(address))
        thunk.dispatch(fetchValidators())
        thunk.dispatch(fetchPool())
        return result;
    } catch (error) {
        return thunk.rejectWithValue(error)
    }
})



export const fetchDelegations = createAsyncThunk('staking/fetchDelegations', async (address: string) => {
    const response = await api.get("/cosmos/staking/v1beta1/delegations/" + address)
    const data = response.data;

    const delegations = data.delegation_responses as Delegation[]
    return delegations
})


export const fetchDelegationValidators = createAsyncThunk('staking/fetchDelegationValidators', async (address: string) => {
    const response = await api.get("/cosmos/staking/v1beta1/delegators/" + address + "/validators")
    const data = response.data;

    const validators = data.validators as Validator[]
    return validators
})

export default createSlice({
    name: 'staking/delegation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDelegations.fulfilled, (state, action) => {
            state.delegations = action.payload
            state.totalStaked = action.payload.reduce((p, c) => p + parseInt(c.balance.amount), 0)
        })
        builder.addCase(fetchDelegationValidators.fulfilled, (state, action) => {
            state.validators = action.payload
        })
    }
}).reducer