import { styled } from "@mui/material";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size: number;
  color: string;
  perc: number;
  secondary?: string;
  width?: number;
}

export default function Donut(props: Props) {
  return (
    <Container
      style={{
        width: props.size,
        height: props.size
      }}
    >
      <svg width={"100%"} height={"100%"} viewBox="0 0 250 250">
        <circle
          cx="125"
          cy="125"
          r="90"
          fill="none"
          stroke={props.secondary || "#151437"}
          strokeWidth={50 * (props.width || 1)}
        />
        <AnimatedCircle
          cy="125"
          cx="125"
          r="90"
          fill="none"
          stroke={props.color}
          strokeWidth={50 * (props.width || 1)}
          strokeDashoffset={2 * Math.PI * 90 * 0.25}
          strokeDasharray={`${2 * Math.PI * 90 * (props.perc / 100)} ${
            2 * Math.PI * 90 * (1 - props.perc / 100)
          }`}
        />
      </svg>
      {props.children && <Children>{props.children}</Children>}
    </Container>
  );
}

const Container = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Children = styled("div")`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimatedCircle = styled("circle")`
  animation: circle-fill-animation 1s ease;
  @keyframes circle-fill-animation {
    0% {
      stroke-dasharray: 0 ${2 * Math.PI * 90};
    }
  }
`;
