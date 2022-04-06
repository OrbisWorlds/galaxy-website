import { styled } from "@mui/system";
import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function InputErrorMessage(props: Props) {
  return <Message>* {props.children}</Message>;
}

const Message = styled("span")`
  font-size: 14px;
  color: #f56161;
`;
