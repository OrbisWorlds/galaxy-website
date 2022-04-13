import { Coin } from "../../common"

export interface Params {
    "voting_params": {
        "voting_period": string
    },
    "deposit_params": {
        "min_deposit": Coin[]
        "max_deposit_period": string
    },
    "tally_params": {
        "quorum": string
        "threshold": string
        "veto_threshold": string
    }
}
