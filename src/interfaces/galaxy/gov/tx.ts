import { Coin } from "../common"
import { VoteOption } from "./proposal"

export interface MsgDeposit {
    proposal_id: number | string
    depositor: string
    amount: Coin
}


export interface MsgVote {
    proposal_id: number | string
    option: VoteOption
    voter: string
}


