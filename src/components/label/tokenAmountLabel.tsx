import { Box, BoxProps, styled } from "@mui/system";

interface Props extends BoxProps {
  amount?: number | string;
  denom?: string;
  label?: string;
}

export default function TokenAmountLabel(props: Props) {
  return (
    <Contaienr {...props}>
      <Label>{props.label}</Label>
      <Token>
        <span>{props.amount}</span>{" "}
        {props.denom?.toUpperCase().replace("U", "")}
      </Token>
    </Contaienr>
  );
}

const Token = styled("span")`
  color: #515f7f;
  font-family: "Heebo-Medium";
  font-size: 15px;
  line-height: 14px;
  & span {
    color: #7d77ff;
    font-family: "Heebo-Medium";
  }
`;
const Label = styled("span")`
  color: #515f7f;
  line-height: 14px;
  font-family: "Heebo-Medium";
  font-size: 14px;
  line-height: 14px;
`;

const Contaienr = styled(Box)`
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: #fafafa;
  padding: 24px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
