import { styled } from "@mui/system";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLPreElement> {}

export default function PopupLabel(props: Props) {
  return <Label>{props.children}</Label>;
}

const Label = styled("p")`
  font-size: 20px;
  margin-top: 0px;
  color: #515f7f;
  font-family: "Heebo-Medium";
`;
