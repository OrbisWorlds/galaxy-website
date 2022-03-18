import { useMediaQuery, useTheme } from "@mui/material";


const Size = {
    mobile: "mobile",
    tablet: "tablet",
    desktop: "desktop",
} as const;

export type Size = typeof Size[keyof typeof Size];

export default function useDeviceType(): Size {
    const theme = useTheme();;
    const mobileMatches = useMediaQuery(theme.breakpoints.down("md"));
    const tabletMatches = useMediaQuery(theme.breakpoints.between("md", 'lg'));

    if (mobileMatches) {
        return Size.mobile
    } else if (tabletMatches) {
        return Size.tablet
    } else {
        return Size.desktop
    }
}