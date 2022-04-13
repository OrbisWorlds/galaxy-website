import React from "react";
import { styled } from "@mui/system";
import Button from "../../components/button";
import { Popup } from "../../components/popup";
import { TokenAmountLabel } from "../../components/label";
import TokenInput from "../../components/input/tokenInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { parseOriginCoinAmount } from "../../utils";
import { fetchBalances } from "../../store/bank";
import config from "../../constants/config";
import InputErrorMessage from "../../components/input/inputErrorMessage";
import InputLabel from "../../components/input/inputLabel";
import { deposit, fetchParamsDeposit } from "../../store/gov";
import { Proposal } from "../../interfaces/galaxy/gov";

interface Props {
  onClose: () => void;
  proposal: Proposal;
}

export default function DepositPopup(props: Props) {
  const dispatch = useAppDispatch();
  const tx = useAppSelector(s => s.tx);
  const wallet = useAppSelector(s => s.wallet);
  const balances = useAppSelector(s => s.bank.balances);
  const params = useAppSelector(s => s.gov.params);
  const [amount, setAmount] = React.useState("");

  const glxBalance = balances.filter(
    x => x.denom === config.coinOriginDenom
  )[0];

  const minDepositAmount = params.deposit_params.min_deposit.reduce(
    (a, b) => a + parseInt(b.amount),
    0
  );

  const totalDepositAmount = props.proposal.total_deposit.reduce(
    (a, b) => a + parseInt(b.amount),
    0
  );

  const insufficientBalance =
    parseFloat(amount) > parseFloat(parseOriginCoinAmount(glxBalance.amount));

  React.useEffect(() => {
    dispatch(fetchParamsDeposit());
  }, [dispatch]);

  React.useEffect(() => {
    if (!wallet?.address) return;
    dispatch(fetchBalances(wallet.address));
  }, [dispatch, wallet]);

  const handleDelegate = () => {
    dispatch(
      deposit({
        depositor: wallet.address,
        amount: {
          denom: glxBalance.denom,
          amount: String(parseFloat(amount) * Math.pow(10, config.coinDemical))
        },
        proposal_id: props.proposal.proposal_id
      })
    )
      .unwrap()
      .then(props.onClose);
  };

  return (
    <Popup maxWidth="500px" onClose={props.onClose}>
      <Content className="column">
        <TokenAmountLabel
          label="Min Deposit"
          amount={parseOriginCoinAmount(minDepositAmount)}
          denom={glxBalance.denom}
          sx={{ mt: 4.5, borderBottom: "none" }}
        />
        <TokenAmountLabel
          label="Total Deposit"
          amount={parseOriginCoinAmount(totalDepositAmount)}
          denom={glxBalance.denom}
        />
        <InputLabel sx={{ mt: 3.75 }}>Amount to Deposit</InputLabel>
        <TokenInput
          onMax={() =>
            setAmount(
              parseOriginCoinAmount(
                Math.min(
                  parseFloat(glxBalance.amount),
                  minDepositAmount - totalDepositAmount
                )
              )
            )
          }
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
          Deposit
        </Button>
      </Content>
    </Popup>
  );
}

const Content = styled("div")`
  padding: 40px 30px;
`;
