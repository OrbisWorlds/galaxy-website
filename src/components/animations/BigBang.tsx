import { Box, styled } from "@mui/material";
import React from "react";
import deviceSize from "../../constants/deviceSize";
import useInterSection from "../../hooks/useInterSection";

export default function BigBang() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useInterSection(ref);

  return (
    <WrapBox ref={ref}>
      <BigBangO
        v={isVisible}
        alt="bigbang-1"
        src="/public/assets/images/bigbang-1.png"
      />
      <BigBangO
        v={isVisible}
        alt="bigbang-1-0"
        transformTo="scale(0.6)"
        src="/public/assets/images/bigbang-1.png"
      />
      <BigBangO
        v={isVisible}
        alt="bigbang-2"
        src="/public/assets/images/bigbang-2.png"
      />
      <BigBangO
        v={isVisible}
        alt="bigbang-3"
        src="/public/assets/images/bigbang-3.png"
      />
    </WrapBox>
  );
}

const WrapBox = styled(Box)`
  width: 70%;
  height: 60%;
  display: flex;
  align-items: center;
  position: absolute;
  justify-content: center;
  @media (max-width: ${deviceSize.tabletMin}) {
    width: 50%;
    height: 50%;
    right: -15%;
    top: -10%;
  }
`;

const BigBangO = styled("img")(
  (p: {
    transformTo?: string;
    transform?: string;
    second?: string;
    v: boolean;
  }) => ({
    height: "100%",
    transform: p.transform || "scale(0)",
    position: "absolute",
    transition: p.second || "2s",
    ...(p.v && {
      transform: p.transformTo || "scale(1)"
    })
  })
);
