import React from "react";
import { styled } from "@mui/system";
import Button from "../../components/button";
import { Popup, PopupMessage, PopupSubLabel } from "../../components/popup";
import { ValidatorPopupHeader } from "../../components/stake";
import { TokenAmountLabel } from "../../components/label";
import { Validator } from "../../interfaces/galaxy/staking";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { parseOriginCoinAmount } from "../../utils";
import { fetchDelegations } from "../../store/staking";
import { Delegation } from "../../interfaces/galaxy/staking/delegation";

interface Props {
  onClose: () => void;

  onReDelegate: (v: Validator, d: Delegation) => void;
  onUnDelegate: (v: Validator) => void;
  onDelegate: (v: Validator) => void;
  validator: Validator;
}

export default function ManagePopup(props: Props) {
  const dispatch = useAppDispatch();
  const wallet = useAppSelector(s => s.wallet);
  const delegations = useAppSelector(s => s.staking.delegation.delegations);
  const delegation = delegations.filter(
    x => x.delegation.validator_address === props.validator.operator_address
  )[0];

  React.useEffect(() => {
    if (!wallet.connected) return;
    dispatch(fetchDelegations(wallet.address));
  }, [wallet, dispatch]);

  return (
    <Popup maxWidth="500px" onClose={props.onClose}>
      <ValidatorPopupHeader
        moniker={props.validator.description.moniker}
        commision={
          parseFloat(props.validator.commission.commission_rates.rate) * 100
        }
      />
      <Content className="column">
        <PopupSubLabel>Webstie</PopupSubLabel>
        <PopupMessage>
          <a
            target={"_blank"}
            href={props.validator.description.website}
            rel="noreferrer"
          >
            {props.validator.description.website}
          </a>
        </PopupMessage>

        <div style={{ marginTop: "20px" }} />

        <PopupSubLabel>Description</PopupSubLabel>
        <PopupMessage>{props.validator.description.details}</PopupMessage>
        <TokenAmountLabel
          label="My Delegation"
          denom={delegation?.balance.denom}
          amount={parseOriginCoinAmount(delegation?.balance.amount)}
          sx={{ mt: 2.5 }}
        />
        <Buttons>
          <Button
            buttonType="border2"
            onClick={() => props.onReDelegate(props.validator, delegation)}
          >
            ReDelegate
          </Button>
          <Button
            buttonType="cancel"
            onClick={() => props.onUnDelegate(props.validator)}
          >
            UnDelegate
          </Button>
          <Button onClick={() => props.onDelegate(props.validator)}>
            Delegate
          </Button>
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
