import { styled } from "@mui/material";

type Algin = "flex-start" | "flex-end" | "center";

interface Props {
  icon?: string;
  moniker: string;
  align?: Algin;
}

export default function ValidatorMoniker(props: Props) {
  return (
    <Container align={props.align || "center"}>
      <Icon alt="validator" src={props.icon || "assets/images/validator.svg"} />
      <Moniker>{props.moniker}</Moniker>
    </Container>
  );
}

const Moniker = styled("span")`
  font-family: "Heebo-Medium";
  font-size: 14px;
  color: #fff;
`;

const Icon = styled("img")`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  margin-right: 15px;
`;

const Container = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(p: { align: Algin }) => p.align};
`;
