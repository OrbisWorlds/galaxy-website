import React from "react";
import { Box } from "@mui/material";
import { styled, BoxProps } from "@mui/system";

export default function InputLabel(props: BoxProps) {
  return <Label {...props}>{props.children}</Label>;
}

const Label = styled(Box)`
  font-size: 14px;
  display: block;
  color: #515f7f;
  font-family: Heebo-Medium;
  margin-bottom: 10px;
`;
