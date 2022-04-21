import React from "react";
import { styled } from "@mui/system";
import Button from "../../components/button";
import { Popup } from "../../components/popup";
import { ValidatorPopupHeader, DelegateWaning } from "../../components/stake";
import { TokenAmountLabel } from "../../components/label";
import TokenInput from "../../components/input/tokenInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { delegate, fetchDelegations } from "../../store/staking";
import { Validator } from "../../interfaces/galaxy/staking";
import { parseOriginCoinAmount, parsePrettyNumber } from "../../utils";
import { fetchBalances } from "../../store/bank";
import config from "../../constants/config";
import InputErrorMessage from "../../components/input/inputErrorMessage";
import InputLabel from "../../components/input/inputLabel";

interface Props {
  onClose: () => void;
  validator: Validator;
}

export default function DelegatePopup(props: Props) {
  const dispatch = useAppDispatch();
  const tx = useAppSelector(s => s.tx);
  const wallet = useAppSelector(s => s.wallet);
  const balances = useAppSelector(s => s.bank.balances);
  const delegations = useAppSelector(s => s.staking.delegation.delegations);

  const [amount, setAmount] = React.useState("");

  const glxBalance = balances.filter(
    x => x.denom === config.coinOriginDenom
  )[0];
  const thisDelegation = delegations.filter(
    x =>
      x.delegation.validator_address === props.validator.operator_address &&
      x.delegation.delegator_address === wallet.address
  )[0];

  const insufficientBalance =
    parseFloat(amount) > parseFloat(parseOriginCoinAmount(glxBalance.amount));

  React.useEffect(() => {
    if (!wallet.connected) return;
    dispatch(fetchDelegations(wallet.address));
    dispatch(fetchBalances(wallet.address));
  }, [wallet, dispatch]);

  const handleDelegate = () => {
    dispatch(
      delegate({
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
        <DelegateWaning />

        {thisDelegation && (
          <TokenAmountLabel
            label="My Delegation"
            amount={parsePrettyNumber(
              parseOriginCoinAmount(thisDelegation.balance.amount)
            )}
            denom={thisDelegation.balance.denom}
            sx={{ mt: 2.5, borderBottom: "none" }}
          />
        )}

        <TokenAmountLabel
          label="Available Balance"
          amount={parsePrettyNumber(parseOriginCoinAmount(glxBalance.amount))}
          denom={glxBalance.denom}
          sx={{ mt: thisDelegation ? 0 : 2.5 }}
        />
        <InputLabel sx={{ mt: 3.75 }}>Amount to Delegate</InputLabel>
        <TokenInput
          onMax={() => setAmount(parseOriginCoinAmount(glxBalance.amount))}
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        {insufficientBalance && (
          <InputErrorMessage>insufficient balance</InputErrorMessage>
        )}

        <Button
          loading={tx.broadcasting.open}
          disabled={insufficientBalance || !parseInt(amount)}
          onClick={handleDelegate}
          sx={{ alignSelf: "flex-end", mt: 3 }}
        >
          Delegate
        </Button>
      </Content>
    </Popup>
  );
}

const Content = styled("div")`
  padding: 40px 30px;
`;
