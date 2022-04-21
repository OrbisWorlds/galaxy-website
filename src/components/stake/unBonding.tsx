import { styled } from "@mui/system";
import { UnbondingDelegation } from "../../interfaces/galaxy/staking/delegation";
import ValidatorMoniker from "../validator-moniker/validatorMoniker";
import moment from "moment";

interface Props {
  unBonding: UnbondingDelegation;
  moniker?: string;
  balance?: string;
  onFormatBalance: (b: string) => string;
}

export default function UnBonding(props: Props) {
  return (
    <Container>
      <ValidatorMoniker
        operatorAddress={props.unBonding.validator_address}
        moniker={props.moniker || props.unBonding.validator_address}
      />
      <RemainingList>
        {props.unBonding.entries.map((x, i) => {
          const dDay = moment(x.completion_time).diff(moment(), "days");
          return (
            <Remaining key={i.toString()}>
              <span className="balance">
                {props.onFormatBalance(x.balance)} GLX
              </span>
              <div className="bar">
                <span
                  style={{
                    width: `${((21 - dDay) / 21) * 100}%`
                  }}
                />
              </div>
              <span className="dday">D-{dDay}</span>
            </Remaining>
          );
        })}
      </RemainingList>
    </Container>
  );
}

const Remaining = styled("div")`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  margin-top: 10px;
  :first-of-type {
    margin-top: 0px;
  }
  .dday {
    font-family: Heebo-Medium;
    font-size: 16px;
    color: #8f8aff;
    margin-left: 40px;
  }
  .bar {
    & span {
      position: absolute;
      top: 0px;
      border-radius: 5px;
      left: 0px;
      bottom: 0px;
      background: linear-gradient(to right, #7d77ff, #c7c4ff);
    }
    position: relative;
    max-width: 540px;
    height: 10px;
    border-radius: 5px;
    margin-left: 40px;
    width: 50%;
    background-color: #1e184f;
  }
  .balance {
    font-size: 14px;
    color: #ffffff;
    font-family: Heebo-Medium;
  }
`;

const RemainingList = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
`;

const Container = styled("div")`
  padding: 26px 40px;
  border-radius: 8px;
  background-color: #0d0c25;
  display: flex;
  align-items: flex-start;
`;
