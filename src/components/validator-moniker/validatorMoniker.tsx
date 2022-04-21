import { styled } from "@mui/material";
import React, { useRef } from "react";
import { useAppSelector } from "../../store/hooks";

type Algin = "flex-start" | "flex-end" | "center";

interface Props {
  operatorAddress: string;
  moniker: string;
  align?: Algin;
  onClick?: () => void;
  dark?: boolean;
}

export default function ValidatorMoniker(props: Props) {
  const iconRef = useRef<HTMLImageElement>(null);
  const validatorImages = useAppSelector(
    s => s.staking.validator.validatorImages
  );

  React.useEffect(() => {
    if (iconRef.current && validatorImages.length && props.operatorAddress) {
      const image = validatorImages.filter(
        x => x.operator_address === props.operatorAddress
      )[0];
      if (image && image.src) {
        iconRef.current.src = image.src;
      } else {
        iconRef.current.src = "assets/images/validator.svg";
      }
    }
  }, [iconRef, validatorImages, props.operatorAddress]);
  return (
    <Container onClick={props.onClick} align={props.align || "center"}>
      <Icon ref={iconRef} alt="validator" src={"assets/images/validator.svg"} />
      <Moniker sx={{ color: props.dark ? "#111" : "#fff" }}>
        {props.moniker}
      </Moniker>
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
  cursor: ${p => (p.onClick !== undefined ? "pointer" : "normal")};
  justify-content: ${(p: { align: Algin }) => p.align};
`;
