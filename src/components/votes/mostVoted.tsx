import { styled } from "@mui/system";
import React from "react";

interface Props {
  color: string;
  children: React.ReactElement | undefined | React.ReactNode | string;
}
export default function MostVoted(props: Props) {
  return (
    <StyledMostVoted color={props.color}>
      <div />
      {props.children}
    </StyledMostVoted>
  );
}

const StyledMostVoted = styled("div")`
  display: flex;
  align-items: center;
  & div {
    margin-right: 10px !important;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${p => p.color};
  }
  & span {
    margin-left: 10px;
  }
  color: ${p => p.color};
`;
