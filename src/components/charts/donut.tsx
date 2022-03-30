import { styled } from "@mui/material";

interface Props {
  size: number;
  color: string;
  perc: number;
}

export default function Donut(props: Props) {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 250 250">
      <circle
        cx="125"
        cy="125"
        r="90"
        fill="none"
        stroke="#151437"
        strokeWidth="50"
      />
      <AnimatedCircle
        cy="125"
        cx="125"
        r="90"
        fill="none"
        stroke={props.color}
        strokeWidth="50"
        strokeDashoffset={2 * Math.PI * 90 * 0.25}
        strokeDasharray={`${2 * Math.PI * 90 * (props.perc / 100)} ${
          2 * Math.PI * 90 * (1 - props.perc / 100)
        }`}
      />
    </svg>
  );
}

const AnimatedCircle = styled("circle")`
  animation: circle-fill-animation 2s ease;
  @keyframes circle-fill-animation {
    0% {
      stroke-dasharray: 0 ${2 * Math.PI * 90};
    }
  }
`;
