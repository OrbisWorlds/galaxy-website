import React from "react";
import { styled } from "@mui/system";
import Button from "../../components/button";
import { Popup } from "../../components/popup";
import { ValidatorPopupHeader, UnDelegateWaning } from "../../components/stake";
import { TokenAmountLabel } from "../../components/label";
import TokenInput from "../../components/input/tokenInput";
import { Validator } from "../../interfaces/galaxy/staking";
import { parseOriginCoinAmount, parsePrettyNumber } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import config from "../../constants/config";
import { fetchDelegations, unDelegate } from "../../store/staking";
import { fetchBalances } from "../../store/bank";
import InputErrorMessage from "../../components/input/inputErrorMessage";

interface Props {
  onClose: () => void;
  validator: Validator;
}

export default function UnDelegatePopup(props: Props) {
  const dispatch = useAppDispatch();
  const delegations = useAppSelector(s => s.staking.delegation.delegations);
  const wallet = useAppSelector(s => s.wallet);
  const tx = useAppSelector(s => s.tx);

  const [amount, setAmount] = React.useState("");

  const delegation = delegations.filter(
    x => x.delegation.validator_address === props.validator.operator_address
  )[0];

  const insufficientBalance =
    parseFloat(amount) >
    parseFloat(parseOriginCoinAmount(delegation?.balance.amount));

  React.useEffect(() => {
    if (!wallet.connected) return;
    dispatch(fetchDelegations(wallet.address));
    dispatch(fetchBalances(wallet.address));
  }, [wallet, dispatch]);

  const handleUnDelegate = () => {
    dispatch(
      unDelegate({
        address: wallet.address,
        validatorAddress: props.validator.operator_address,
        amount: {
          denom: config.coinOriginDenom,
          amount: String(parseFloat(amount) * Math.pow(10, config.coinDemical))
        }
      })
    )
      .unwrap()
      .then(props.onClose);
  };

  return (
    <Popup maxWidth="500px" onClose={props.onClose}>
      <ValidatorPopupHeader
        operatorAddress={props.validator.operator_address}
        moniker={props.validator.description.moniker}
        commision={
          parseFloat(props.validator.commission.commission_rates.rate) * 100
        }
      />
      <Content className="column">
        <UnDelegateWaning />

        <TokenAmountLabel
          label="My Delegation"
          denom={delegation?.balance.denom}
          amount={parsePrettyNumber(
            parseOriginCoinAmount(delegation?.balance.amount)
          )}
          sx={{ mt: 2.5 }}
        />
        <TokenInput
          onMax={() =>
            setAmount(parseOriginCoinAmount(delegation.balance.amount))
          }
          value={amount}
          onChange={e => setAmount(e.target.value)}
          sx={{ mt: 2 }}
        />
        {insufficientBalance && (
          <InputErrorMessage>insufficient balance</InputErrorMessage>
        )}
        <Button
          loading={tx.broadcasting.open}
          disabled={insufficientBalance || !parseInt(amount)}
          onClick={handleUnDelegate}
          sx={{ alignSelf: "flex-end", mt: 3 }}
        >
          {"UnDelegate"}
        </Button>
      </Content>
    </Popup>
  );
}

const Content = styled("div")`
  padding: 30px 24px;
`;
