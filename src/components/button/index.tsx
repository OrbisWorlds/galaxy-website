import React, { Children } from "react";
import {
  ButtonBase,
  ButtonBaseProps,
  ButtonBaseTypeMap,
  ExtendButtonBase,
  styled
} from "@mui/material";

interface Props extends ButtonBaseProps {
  border?: boolean;
}

export default function Button(props: Props) {
  const ButtonComponent = props.border ? BorderButtonWrap : ButtonWrap;
  return <ButtonComponent {...props}>{props.children}</ButtonComponent>;
}

const BorderButtonWrap = styled(ButtonBase)`
  border: 1px solid #2a267b;
  color: #5954cc;
  border-radius: 4px;
  padding: 12px 24px;
  font-family: Heebo-Regular;
  :disabled {
    color: #544c8f;
  }
`;

const ButtonWrap = styled(ButtonBase)`
  background-color: #2a267b;
  color: #fff;

  border-radius: 4px;
  padding: 12px 24px;

  font-family: Heebo-Regular;
  :disabled {
    color: #544c8f;
  }
`;
