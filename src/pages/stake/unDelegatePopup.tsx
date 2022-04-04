import React from "react";
import { styled } from "@mui/system";
import Button from "../../components/button";
import { Popup } from "../../components/popup";
import { ValidatorPopupHeader, UnDelegateWaning } from "../../components/stake";
import { TokenAmountLabel } from "../../components/label";
import TokenInput from "../../components/input/tokenInput";

interface Props {
  onClose: () => void;
}

export default function UnDelegatePopup(props: Props) {
  const handleDelegate = () => {
    props.onClose();
  };

  return (
    <Popup maxWidth="500px" onClose={props.onClose}>
      <ValidatorPopupHeader />
      <Content className="column">
        <UnDelegateWaning />

        <TokenAmountLabel sx={{ mt: 2.5 }} />
        <TokenInput sx={{ mt: 2 }} />
        <Button onClick={handleDelegate} sx={{ alignSelf: "flex-end", mt: 3 }}>
          UnDelegate
        </Button>
      </Content>
    </Popup>
  );
}

const Content = styled("div")`
  padding: 30px 24px;
`;
