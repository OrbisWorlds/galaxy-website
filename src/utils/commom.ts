export const parseOriginCoinAmount = (origin: string | number, demical: number = 6) => {
    if (typeof origin === 'number') {
        origin = String(origin)
    }
    if (origin.length < demical) {
        return (origin)
    }
    return (origin.substring(0, origin.length - demical)) + "." + origin.substring(origin.length - demical)
}


export const parsePrettyNumber = (number: string | number) => {

    if (!number) return "0"
    if (typeof number === 'string') {
        number = parseInt(number)
    }

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

}