
export interface Vote {

}

export const VoteOption = {
    yes: "Yes",
    no: "No",
    noWithVeto: "NoWithVeto",
    abstain: "Abstain"
} as const;
export type VoteOption = typeof VoteOption[keyof typeof VoteOption];