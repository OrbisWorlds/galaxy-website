import { assertIsDeliverTxSuccess, SigningStargateClient } from "@cosmjs/stargate";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { chainConfig } from "../../constants/chain";
import { Proposal, Tally } from "../../interfaces/galaxy/gov";
import { MsgDeposit, MsgVote } from "../../interfaces/galaxy/gov/tx";

interface InitialState {
    proposals: Proposal[],
    tally: {
        [n: string]: Tally
    }
}

const initialState: InitialState = {
    proposals: [],
    tally: {}
}

export const vote = createAsyncThunk('gov/deposit', async ({ proposal_id, option, voter }: MsgVote, thunk) => {
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
            voter,
            [{
                typeUrl: "/cosmos.gov.v1beta1.MsgVote",
                value: {
                    voter,
                    proposalId: proposal_id,
                    option
                }
            }],
            {
                gas: "1800000",
                amount: [{ denom: "uglx", amount: "2000" }]
            },
            ""
        )

        assertIsDeliverTxSuccess(result)
        thunk.dispatch(fetchProposalTally(proposal_id))
        return result;
    } catch (error) {
        return thunk.rejectWithValue(error)
    }
})


export const deposit = createAsyncThunk('gov/deposit', async ({ proposal_id, depositor, amount }: MsgDeposit, thunk) => {
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

export const fetchProposalTally = createAsyncThunk('vote/fetchProposalTally', async (proposalId: string | number, thunk) => {
    try {
        const response = await api.get('/cosmos/gov/v1beta1/proposals/' + proposalId + "/tally")
        const data = response.data;

        const tally = data.tally as Tally

        return { proposalId, tally }
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
        builder.addCase(fetchProposalTally.fulfilled, (state, action) => {
            state.tally[action.payload.proposalId] = action.payload.tally
        })
    }
}).reducer