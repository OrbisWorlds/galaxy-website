export const parseOriginCoinAmount = (origin: string | number, demical: number = 6) => {
    if (!origin) return "0"
    if (typeof origin === 'number') {
        origin = String(origin)
    }
    if (origin.length < demical) {
        return String(parseInt(origin) / 1000000)
    }
    return parseFloat((origin.substring(0, origin.length - demical) || "0") + "." + origin.substring(origin.length - demical)).toString()
}


export const parsePrettyNumber = (number: string | number) => {

    if (!number) return "0"
    if (typeof number === 'number') {
        number = String(number)
    }

    const [integer, demical] = number.split('.')


    return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (demical ? "." + demical : "")

}
