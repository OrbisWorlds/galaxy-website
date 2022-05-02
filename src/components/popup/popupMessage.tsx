import { styled } from "@mui/system";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

export default function PopupMessage(props: Props) {
  return <Label>{props.children}</Label>;
}

const Label = styled("span")`
  font-size: 14px;
  color: #999999;
  line-height: 24px;
  word-wrap: break-word;
`;
