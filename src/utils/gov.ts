import { Tally, VoteOption } from "../interfaces/galaxy/gov";

interface MostVoted {
    option: keyof typeof VoteOption
    value: number
    perc: number
}


export const getVotePerc = (tally: Tally, key: keyof typeof VoteOption) => {
    return Math.floor((parseInt(tally[key]) /
        Object.keys(tally).reduce((a, b) => parseInt(tally[b]) + a, 0)) * 100)
}

export const getMostVoted = (tally: Tally | undefined) => {
    if (tally === undefined || Object.keys(tally).length === 0) {
        return null;
    } else if (!Object.keys(tally).filter(x => parseInt(tally[x]) > 0).length) {
        return null;
    }
    let initaialOption = Object.keys(tally)[0] as keyof typeof VoteOption

    let mostVoted: MostVoted = { option: initaialOption, value: tally[Object.keys(tally)[0]], perc: getVotePerc(tally, initaialOption) };

    Object.keys(tally).map(key => {
        let v = parseInt(tally[key])
        let max = Math.max(v, mostVoted.value)
        if (max === v) {
            let option = key as keyof typeof VoteOption
            mostVoted = { option, value: v, perc: getVotePerc(tally, option) }
        }
    })

    return mostVoted
}