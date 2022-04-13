import { Coin } from "../../common"

export interface Proposal {
    proposal_id: string
    content: {
        "@type": "/cosmos.gov.v1beta1.TextProposal"
        description: string
        title: string
    }
    status: ProposalStatus
    final_tally_result: Tally
    submit_time: string
    deposit_end_time: string
    total_deposit: Coin[],
    voting_start_time: string
    voting_end_time: string
}


export const VoteOption = {
    yes: "1",
    abstain: "2",
    no: "3",
    no_with_veto: "4"
} as const;

export type VoteOption = typeof VoteOption[keyof typeof VoteOption];

export const VoteOptionLabel = {
    '1': "Yes",
    '2': "Abstain",
    '3': "No",
    '4': "NoWithVeto"
} as const;

export type VoteOptionLabel = typeof VoteOptionLabel[keyof typeof VoteOptionLabel];


export interface Tally {
    yes: string
    abstain: string
    no: string
    no_with_veto: string
    [prop: string]: any;

}
export const ProposalStatus = {
    PROPOSAL_STATUS_UNSPECIFIED: "PROPOSAL_STATUS_UNSPECIFIED",
    PROPOSAL_STATUS_DEPOSIT_PERIOD: "PROPOSAL_STATUS_DEPOSIT_PERIOD",
    PROPOSAL_STATUS_VOTING_PERIOD: "PROPOSAL_STATUS_VOTING_PERIOD",
    PROPOSAL_STATUS_PASSED: "PROPOSAL_STATUS_PASSED",
    PROPOSAL_STATUS_REJECTED: "PROPOSAL_STATUS_REJECTED",
    PROPOSAL_STATUS_FAILED: "PROPOSAL_STATUS_FAILED",
} as const;
export type ProposalStatus = typeof ProposalStatus[keyof typeof ProposalStatus];
