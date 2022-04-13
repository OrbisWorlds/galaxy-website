import { Coin } from "../../common"

export interface Reward {
    validator_address: string
    reward: Coin[]
}

export interface ClaimAllRewardParams {
    address: string
    validatorAddresses: string[]
}