import React from "react";
import { styled } from "@mui/system";
import Button from "../../components/button";
import { Popup } from "../../components/popup";
import { ValidatorPopupHeader } from "../../components/stake";
import TokenInput from "../../components/input/tokenInput";
import SearchInput from "../../components/input/searchInput";
import Validators from "../../components/stake/validators";
import { Delegation } from "../../interfaces/galaxy/staking/delegation";
import { parseOriginCoinAmount } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchDelegations, reDelegate } from "../../store/staking";
import InputErrorMessage from "../../components/input/inputErrorMessage";
import { Validator } from "../../interfaces/galaxy/staking";
import InputLabel from "../../components/input/inputLabel";
import config from "../../constants/config";

interface Props {
  onClose: () => void;
  validator: Validator;
  delegation: Delegation;
}

export default function ReDelegatePopup(props: Props) {
  const dispatch = useAppDispatch();
  const wallet = useAppSelector(s => s.wallet);
  const validators = useAppSelector(s => s.staking.validator.validators).filter(
    x => x.operator_address !== props.delegation.delegation.validator_address
  );
  const delegations = useAppSelector(s => s.staking.delegation.delegations);
  const [amount, setAmount] = React.useState("");
  const [keyword, setKeyword] = React.useState("");

  const [validatorAddress, setValidatorAddress] = React.useState("");

  const delegation = delegations.filter(
    x =>
      x.delegation.validator_address ===
      props.delegation.delegation.validator_address
  )[0];

  const insufficientBalance =
    parseFloat(amount) >
    parseFloat(parseOriginCoinAmount(delegation.balance.amount));

  React.useEffect(() => {
    if (!wallet.connected) return;
    dispatch(fetchDelegations(wallet.address));
  }, [wallet, dispatch]);

  const handleReDelegate = () => {
    dispatch(
      reDelegate({
        address: wallet.address,
        validatorAddress: props.validator.operator_address,
        validatorDistAddress: validatorAddress,
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
        <Select>
          Select{" : "}
          <img alt="sel-validator" src="/public/assets/images/validator.svg" />
          <span>
            {
              validators.filter(x => x.operator_address === validatorAddress)[0]
                ?.description.moniker
            }
          </span>
        </Select>
        <SearchInput
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />

        <ValidatorsWrap>
          <Validators
            validators={validators}
            keyword={keyword}
            address={validatorAddress}
            onSelect={v => setValidatorAddress(v.operator_address)}
          />
        </ValidatorsWrap>

        <InputLabel
          sx={{
            mt: 3.5
          }}
        >
          Available for redelegation{" "}
          <AvailableRedel>
            {parseOriginCoinAmount(delegation.balance.amount)} GLX
          </AvailableRedel>
        </InputLabel>
        <TokenInput
          onMax={() =>
            setAmount(parseOriginCoinAmount(delegation.balance.amount))
          }
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        {insufficientBalance && (
          <InputErrorMessage>insufficient balance</InputErrorMessage>
        )}

        <Button
          disabled={
            insufficientBalance || !parseInt(amount) || !validatorAddress
          }
          onClick={handleReDelegate}
          sx={{ alignSelf: "flex-end", mt: 3 }}
        >
          ReDelegate
        </Button>
      </Content>
    </Popup>
  );
}

const Select = styled("div")`
  display: flex;
  align-items: center;
  color: #515f7f;
  font-family: "Heebo-Medium";
  margin-bottom: 20px;
  font-size: 14px;
  & img {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 10px;
    margin-left: 20px;
  }
  & span {
    font-size: 14px;
    color: #111111;
    font-family: "Heebo-Medium";
  }
`;

const AvailableRedel = styled("span")`
  color: #7d77ff;
  margin-left: 10px;
  font-family: "Heebo-Bold";
`;
const ValidatorsWrap = styled("div")`
  margin-top: 10px;
`;

const Content = styled("div")`
  padding: 30px 24px;
`;
