import { useMediaQuery } from "@mui/material";
import deviceSize from "../constants/deviceSize";


const DeviceSize = {
    mobile: "mobile",
    tablet: "tablet",
    desktop: "desktop",
} as const;


export type DeviceSize = typeof DeviceSize[keyof typeof DeviceSize];

export default function useDeviceType(): DeviceSize {
    const mobileMatches = useMediaQuery(`(max-width:${deviceSize.tabletMin})`)
    const tabletMatches = useMediaQuery(`(max-width:${deviceSize.laptopMin})`)

    if (mobileMatches) {
        return DeviceSize.mobile
    } else if (tabletMatches) {
        return DeviceSize.tablet
    } else {
        return DeviceSize.desktop
    }
}