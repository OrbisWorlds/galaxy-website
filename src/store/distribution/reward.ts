import { assertIsDeliverTxSuccess, SigningStargateClient } from "@cosmjs/stargate";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { chainConfig } from "../../constants/chain";
import { Coin } from "../../interfaces";
import { Reward, ClaimAllRewardParams } from "../../interfaces/galaxy/distribution";
import { fetchBalances } from "../bank";
import { fetchDelegations, fetchDelegationValidators } from "../staking";

interface InitialState {
    rewards: Reward[]
    totalReward: number
}

const initialState: InitialState = {
    rewards: [],
    totalReward: 0
}

export const claimAllRewards = createAsyncThunk('distribution/claimAllRewards',
    async ({ address, validatorAddresses }: ClaimAllRewardParams, thunk) => {
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
                validatorAddresses.map(x => ({
                    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
                    value: {
                        delegatorAddress: address,
                        validatorAddress: x
                    }
                })),
                {
                    gas: "1800000",
                    amount: [{ denom: "uglx", amount: "2000" }]
                },
                ""
            )
            assertIsDeliverTxSuccess(result)
            thunk.dispatch(fetchRewards(address))
            thunk.dispatch(fetchDelegations(address))
            thunk.dispatch(fetchDelegationValidators(address))
            thunk.dispatch(fetchBalances(address))
            return result;
        } catch (error) {
            return thunk.rejectWithValue(error)
        }
    })

export const fetchRewards = createAsyncThunk('distribution/fetchRewards', async (address: string) => {
    const response = await api.get("/cosmos/distribution/v1beta1/delegators/" + address + "/rewards")
    const data = response.data;

    const totalReward = data.total as Coin[]
    const rewards = data.rewards as Reward[]

    return {
        totalReward: totalReward[0] ? parseInt(totalReward[0].amount) : 0,
        rewards
    }
})

export default createSlice({
    name: 'distribution/reward',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRewards.fulfilled, (state, action) => {
            state.rewards = action.payload.rewards
            state.totalReward = action.payload.totalReward
        })
    }
}).reducer
