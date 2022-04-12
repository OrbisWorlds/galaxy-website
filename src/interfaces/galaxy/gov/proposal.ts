import { Coin } from "../common"

export interface Proposal {
    proposal_id: string
    content: {

        "@type": "/cosmos.gov.v1beta1.TextProposal"
        description: string
        title: string
    }
    status: ProposalStatus
    final_tally_result: {
        yes: string
        abstain: string
        no: string
        no_with_veto: string
    }
    submit_time: string
    deposit_end_time: string
    total_deposit: Coin[],
    voting_start_time: string
    voting_end_time: string

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
