import { Coin } from "../common"

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