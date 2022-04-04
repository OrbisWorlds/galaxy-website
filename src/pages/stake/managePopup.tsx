import React from "react";
import { styled } from "@mui/system";
import Button from "../../components/button";
import { Popup, PopupMessage, PopupSubLabel } from "../../components/popup";
import { ValidatorPopupHeader } from "../../components/stake";
import { TokenAmountLabel } from "../../components/label";
import { Validator } from "../../interfaces/galaxy/staking";

interface Props {
  onClose: () => void;

  onReDelegate: (v: Validator) => void;
  onUnDelegate: (v: Validator) => void;
  validator: Validator;
}

export default function ManagePopup(props: Props) {
  const handleDelegate = () => {
    props.onClose();
  };

  return (
    <Popup maxWidth="500px" onClose={props.onClose}>
      <ValidatorPopupHeader />
      <Content className="column">
        <PopupSubLabel>Webstie</PopupSubLabel>
        <PopupMessage>https://galaxychain.zone</PopupMessage>

        <div style={{ marginTop: "20px" }} />

        <PopupSubLabel>Description</PopupSubLabel>
        <PopupMessage>
          01node Professional Staking Services for Cosmos, Iris, Terra, Solana,
          Kava, Polkadot, Skale
        </PopupMessage>
        <TokenAmountLabel sx={{ mt: 2.5 }} />
        <Buttons>
          <Button
            buttonType="border2"
            onClick={() => props.onReDelegate(props.validator)}
          >
            ReDelegate
          </Button>
          <Button
            buttonType="cancel"
            onClick={() => props.onUnDelegate(props.validator)}
          >
            UnDelegate
          </Button>
          <Button onClick={handleDelegate}>Delegate</Button>
        </Buttons>
      </Content>
    </Popup>
  );
}

const Buttons = styled("div")`
  display: flex;
  align-items: center;
  margin-top: 32px;
  align-self: flex-end;
  & button {
    margin-left: 12px;
  }
`;
const Content = styled("div")`
  padding: 40px 30px;
`;
