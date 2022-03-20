import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";
import React from "react";
import useInterSection from "../../hooks/useInterSection";

interface Props extends BoxProps {
  children?: React.ReactNode | undefined;
  td?: string;
  parent?: boolean;
}

export default function InterSection(props: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useInterSection(ref, props.parent);
  return (
    <FadeIn {...props} v={isVisible} td={props.td} ref={ref}>
      {props.children}
    </FadeIn>
  );
}

const FadeIn = styled(Box)((p: { v: boolean; td?: string }) => ({
  opacity: 0,
  transform: "translateY(10vh)",
  visibility: "hidden",
  transition: `opacity 0.6s  ease-out, transform 1s ease-out`,
  transitionDelay: p.td || "0s",
  "will-change": "opacity, visibility",
  ...(p.v && {
    opacity: 1,
    transform: "none",
    visibility: "visible"
  })
}));
