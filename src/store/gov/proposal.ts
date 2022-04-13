import { assertIsDeliverTxSuccess, SigningStargateClient } from "@cosmjs/stargate";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { galaxyChainConfig } from "../../constants/chain";
import { Proposal } from "../../interfaces/galaxy/gov";
import { MsgDeposit } from "../../interfaces/galaxy/gov/tx";

interface InitialState {
    proposals: Proposal[]
}

const initialState: InitialState = {
    proposals: []
}



export const deposit = createAsyncThunk('gov/deposit', async ({ proposal_id, depositor, amount }: MsgDeposit, thunk) => {
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
            depositor,
            [{
                typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
                value: {
                    depositor,
                    proposalId: proposal_id,
                    amount: [amount]
                }
            }],
            {
                gas: "1800000",
                amount: [{ denom: "uglx", amount: "2000" }]
            },
            ""
        )

        assertIsDeliverTxSuccess(result)
        thunk.dispatch(fetchProposals())
        return result;
    } catch (error) {
        return thunk.rejectWithValue(error)
    }
})






export const fetchProposals = createAsyncThunk('vote/fetchProposals', async (arg, thunk) => {
    try {
        const response = await api.get('/cosmos/gov/v1beta1/proposals')
        const data = response.data;

        const proposals = data.proposals as Proposal[]

        return proposals
    } catch (error) {
        return thunk.rejectWithValue(error)
    }
})


export default createSlice({
    name: 'gov/proposal',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchProposals.fulfilled, (state, action) => { state.proposals = action.payload })
    }
}).reducer