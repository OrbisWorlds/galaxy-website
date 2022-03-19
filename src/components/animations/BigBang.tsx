import { Box, styled } from "@mui/material";
import React from "react";
import useInterSection from "../../hooks/useInterSection";

export default function BigBang() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useInterSection(ref);

  return (
    <WrapBox ref={ref}>
      <BigBangO
        v={isVisible}
        alt="bigbang-1"
        src="/assets/images/bigbang-1.png"
      />
      <BigBangO
        v={isVisible}
        alt="bigbang-1-0"
        transformTo="scale(0.6)"
        src="/assets/images/bigbang-1.png"
      />
      <BigBangO
        v={isVisible}
        alt="bigbang-2"
        src="/assets/images/bigbang-2.png"
      />
      <BigBangO
        v={isVisible}
        alt="bigbang-3"
        src="/assets/images/bigbang-3.png"
      />
    </WrapBox>
  );
}

const WrapBox = styled(Box)({
  position: "absolute",
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

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
