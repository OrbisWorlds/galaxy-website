import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { Proposal, ProposalStatus } from "../../interfaces/galaxy/gov";

interface InitialState {
    proposals: Proposal[]
}

const initialState: InitialState = {
    proposals: []
}


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