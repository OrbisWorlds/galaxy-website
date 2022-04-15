import { Coin } from "../../common";

export const ClaimMissionState = {
    notEligible: "mission_not_eligible",
    eligible: "mission_eligible",
    claimed: "mission_claimed",
    coming: "mission_coming"
} as const;
export type ClaimMissionState = typeof ClaimMissionState[keyof typeof ClaimMissionState];


export interface ClaimRecord {
    address: string
    inital_claimable_amount: Coin[]
    action_completed: boolean[]
}




export const ClaimMissionStateLabel = {
    [ClaimMissionState.notEligible]: "Not Eligible",
    [ClaimMissionState.eligible]: "Eligible",
    [ClaimMissionState.claimed]: "Claimed",
    [ClaimMissionState.coming]: "Coming",
}
