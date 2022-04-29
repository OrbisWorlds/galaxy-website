import { assertIsDeliverTxSuccess, SigningStargateClient } from "@cosmjs/stargate";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { chainConfig } from "../../constants/chain";
import { Validator } from "../../interfaces/galaxy/staking";
import { DelegateParams, Delegation, ReDelegateParams, UnbondingDelegation } from "../../interfaces/galaxy/staking/delegation";
import { fetchBalances } from "../bank";
import { fetchRewards } from "../distribution";
import { disconnectWallet } from "../wallet";
import { fetchPool } from "./pool";
import { fetchValidators } from "./validator";

interface InitialState {
    delegations: Delegation[],
    validators: Validator[],
    unbondingDelegations: UnbondingDelegation[],
    totalStaked: number
}

const initialState: InitialState = {
    delegations: [],
    validators: [],
    unbondingDelegations: [],
    totalStaked: 0,
}

export const unDelegate = createAsyncThunk('staking/unDelegate', async ({ address, validatorAddress, amount }: DelegateParams, thunk) => {
    try {
        if (!window.keplr || !window.getOfflineSignerOnlyAmino) {
            throw new Error("Please install keplr extension.")
        }
        await window.keplr.enable(chainConfig.chainId);
        const offlineSigner = window.getOfflineSignerOnlyAmino(chainConfig.chainId);

        const client = await SigningStargateClient.connectWithSigner(
            chainConfig.rpc,
            offlineSigner,
        )

        const result = await client.signAndBroadcast(
            address,
            [{
                typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
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
        thunk.dispatch(fetchUnbondingDelegations(address))
        return result;
    } catch (error) {
        return thunk.rejectWithValue(error)
    }
})

export const delegate = createAsyncThunk('staking/delegate', async ({ address, validatorAddress, amount }: DelegateParams, thunk) => {
    try {
        if (!window.keplr || !window.getOfflineSignerOnlyAmino) {
            throw new Error("Please install keplr extension.")
        }
        await window.keplr.enable(chainConfig.chainId);
        const offlineSigner = window.getOfflineSignerOnlyAmino(chainConfig.chainId);

        const client = await SigningStargateClient.connectWithSigner(
            chainConfig.rpc,
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
                gas: "300000",
                amount: [{ denom: "uglx", amount: String(300000 * chainConfig.gasPriceStep!.average) }]
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

export const reDelegate = createAsyncThunk('staking/reDelegate', async ({ address, validatorAddress, validatorDistAddress, amount }: ReDelegateParams, thunk) => {
    try {
        if (!window.keplr || !window.getOfflineSignerOnlyAmino) {
            throw new Error("Please install keplr extension.")
        }
        await window.keplr.enable(chainConfig.chainId);
        const offlineSigner = window.getOfflineSignerOnlyAmino(chainConfig.chainId);

        const client = await SigningStargateClient.connectWithSigner(
            chainConfig.rpc,
            offlineSigner,
        )

        const result = await client.signAndBroadcast(
            address,
            [{
                typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
                value: {
                    delegatorAddress: address,
                    validatorSrcAddress: validatorAddress,
                    validatorDstAddress: validatorDistAddress,
                    amount
                }
            }],
            {
                gas: "300000",
                amount: [{ denom: "uglx", amount: String(300000 * chainConfig.gasPriceStep!.average) }]
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

export const fetchUnbondingDelegations = createAsyncThunk('staking/fetchUnbondingDelegations', async (address: string) => {
    const response = await api.get("/cosmos/staking/v1beta1/delegators/" + address + '/unbonding_delegations')
    const data = response.data;

    const unbondingDelegations = data.unbonding_responses as UnbondingDelegation[]
    return unbondingDelegations
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
        builder.addCase(fetchUnbondingDelegations.fulfilled, (state, action) => {
            state.unbondingDelegations = action.payload
        })
        builder.addCase(disconnectWallet.fulfilled, (state, action) => {
            state.delegations = []
            state.totalStaked = 0;
            state.unbondingDelegations = []
            state.validators = []
        })
    }
}).reducer
