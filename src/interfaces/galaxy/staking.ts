
export interface Validator {
    "moniker": string
    "website": string
    "details": string
    "voting_power": number;
    "commission"?: number
    "delegator_address": string
    "validator_address": string

    "rank"?: number
}

export interface DelegatedValidator extends Validator {
    staked: number;
    status: "BONDED" | "UNBONDING";
    rewards: number

}


export type Validators = Validator[]
export type DelegatedValidators = DelegatedValidator[] 
