import { BoxProps, Box, ButtonBase, InputBase } from "@mui/material";
import { styled } from "@mui/system";

export default function TokenInput(props: BoxProps) {
  return (
    <Box {...props}>
      <Label>Amount to Delegate</Label>
      <Container>
        <Input type="number" placeholder="0.00000" />
        <Max>MAX</Max>
        <Token>GLX</Token>
      </Container>
    </Box>
  );
}

const Label = styled("span")`
  font-size: 14px;
  display: block;
  color: #515f7f;
  font-family: Heebo-Medium;
  margin-bottom: 10px;
`;

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
