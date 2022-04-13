import { Coin } from "../common"

export interface MsgDeposit {
    proposal_id: number | string
    depositor: string
    amount: Coin
}


