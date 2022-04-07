import { SxProps, Box, ButtonBase, InputBase, Theme } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

interface Props {
  value?: string;
  sx?: SxProps<Theme>;
  onMax?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function TokenInput(props: Props) {
  return (
    <Box sx={props.sx}>
      <Container>
        <Input
          value={props.value}
          onChange={props.onChange}
          type="number"
          placeholder="0.000000"
        />
        <Max onClick={props.onMax}>MAX</Max>
        <Token>GLX</Token>
      </Container>
    </Box>
  );
}

const Token = styled("span")`
  font-size: 16px;
  border-left: 1px solid #dee2e6;
  font-family: Heebo-Medium;
  color: #515f7f;
  padding: 17px 21px;
  border-bottom-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const Container = styled("div")`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  display: flex;
  align-items: stretch;
`;

const Input = styled(InputBase)`
  font-size: 14px;
  flex: 1;
  padding: 12px 20px;
`;

const Max = styled(ButtonBase)`
  align-self: center;
  padding: 5px 9px;
  margin-right: 12px;
  border-radius: 20px;
  background-color: #7d77ff;
  color: #fff;
  font-size: 11px;
`;
