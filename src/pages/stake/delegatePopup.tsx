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
import { parseOriginCoinAmount } from "../../utils";
import { fetchBalances } from "../../store/bank";
import config from "../../constants/config";
import { Coin } from "../../interfaces/galaxy";
import InputErrorMessage from "../../components/input/inputErrorMessage";

interface Props {
  onClose: () => void;
  validator: Validator;
}

export default function DelegatePopup(props: Props) {
  const dispatch = useAppDispatch();
  const wallet = useAppSelector(s => s.wallet);
  const balances = useAppSelector(s => s.bank.balances);
  const delegations = useAppSelector(s => s.staking.delegation.delegations);
  /**  **/
  const [amount, setAmount] = React.useState("");
  /**  **/
  const glxBalance =
    balances.filter(x => x.denom === config.coinOriginDenom)[0] ||
    ({ denom: config.coinOriginDenom, amount: "0" } as Coin);
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
            amount={parseOriginCoinAmount(thisDelegation.balance.amount)}
            denom={thisDelegation.balance.denom}
            sx={{ mt: 2.5, borderBottom: "none" }}
          />
        )}
        <TokenAmountLabel
          label="Available Balance"
          amount={parseOriginCoinAmount(glxBalance.amount)}
          denom={glxBalance.denom}
        />
        <TokenInput
          onMax={() => setAmount(parseOriginCoinAmount(glxBalance.amount))}
          value={amount}
          onChange={e => setAmount(e.target.value)}
          sx={{ mt: 3.75 }}
        />
        {insufficientBalance && (
          <InputErrorMessage>insufficient balance</InputErrorMessage>
        )}
        <Button
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