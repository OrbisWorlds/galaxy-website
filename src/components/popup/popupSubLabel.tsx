import { styled } from "@mui/system";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLPreElement> {}

export default function PopupSubLabel(props: Props) {
  return <Label>{props.children}</Label>;
}

const Label = styled("p")`
  margin: 0px 0px;
  font-size: 14px;
  color: #515f7f;
  font-family: "Heebo-Medium";
`;
