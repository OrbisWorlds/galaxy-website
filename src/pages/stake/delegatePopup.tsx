import React from "react";
import { styled } from "@mui/system";
import Button from "../../components/button";
import { Popup } from "../../components/popup";
import { ValidatorPopupHeader, DelegateWaning } from "../../components/stake";
import { TokenAmountLabel } from "../../components/label";
import TokenInput from "../../components/input/tokenInput";

interface Props {
  onClose: () => void;
}

export default function DelegatePopup(props: Props) {
  const handleDelegate = () => {
    props.onClose();
  };

  return (
    <Popup maxWidth="500px" onClose={props.onClose}>
      <ValidatorPopupHeader />
      <Content className="column">
        <DelegateWaning />

        <TokenAmountLabel sx={{ mt: 2.5, borderBottom: "none" }} />
        <TokenAmountLabel />
        <TokenInput sx={{ mt: 3.75 }} />
        <Button onClick={handleDelegate} sx={{ alignSelf: "flex-end", mt: 3 }}>
          Delegate
        </Button>
      </Content>
    </Popup>
  );
}

const Content = styled("div")`
  padding: 40px 30px;
`;
