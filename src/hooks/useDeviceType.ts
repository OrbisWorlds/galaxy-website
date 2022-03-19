import { useMediaQuery, useTheme } from "@mui/material";


const DeviceSize = {
    mobile: "mobile",
    tablet: "tablet",
    desktop: "desktop",
} as const;

export type DeviceSize = typeof DeviceSize[keyof typeof DeviceSize];

export default function useDeviceType(): DeviceSize {
    const theme = useTheme();;
    const mobileMatches = useMediaQuery(theme.breakpoints.down("md"));
    const tabletMatches = useMediaQuery(theme.breakpoints.between("md", 'lg'));

    if (mobileMatches) {
        return DeviceSize.mobile
    } else if (tabletMatches) {
        return DeviceSize.tablet
    } else {
        return DeviceSize.desktop
    }
}