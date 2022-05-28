export interface Validator {

    sort?: number;

    operator_address: string;
    jailed: boolean;
    status: BondStatus;
    tokens: string
    delegator_shares: string
    description: {
        moniker: string
        identity: string
        website: string
        security_contact: string
        details: string
    }
    unbonding_height: number;
    unbonding_time: string;
    commission: {
        commission_rates: {
            rate: string
            max_rate: string
            max_change_rate: string
        }
        update_time: string;
    }
    min_self_delegation: string;
}


export interface ValidatorImage {
    operator_address: string;
    src: string
}




export interface DelegatedValidator extends Validator {
    staked: number;
    rewards: number

}


export type Validators = Validator[]
export type DelegatedValidators = DelegatedValidator[]


export const BondStatus = {
    BOND_STATUS_UNSPECIFIED: "BOND_STATUS_UNSPECIFIED",
    BOND_STATUS_UNBONDED: "BOND_STATUS_UNBONDED",
    BOND_STATUS_UNBONDING: "BOND_STATUS_UNBONDING",
    BOND_STATUS_BONDED: "BOND_STATUS_BONDED",
} as const;
export type BondStatus = typeof BondStatus[keyof typeof BondStatus];
