import { Coin } from "../../common"

export interface Delegation {
    delegation: {
        delegator_address: string
        validator_address: string
        shares: string
    }
    balance: {
        denom: string
        amount: string
    }
}

export interface UnbondingDelegation {
    delegator_address: string
    validator_address: string
    entries: {
        "creation_height": string
        "completion_time": string
        "initial_balance": string
        "balance": string
    }[]
}


export interface DelegateParams {
    address: string
    validatorAddress: string
    amount: Coin
}
export interface ReDelegateParams {
    address: string
    validatorAddress: string
    validatorDistAddress: string
    amount: Coin
}