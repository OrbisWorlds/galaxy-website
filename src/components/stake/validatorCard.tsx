import { styled } from "@mui/system";
import { Pool, Validator } from "../../interfaces/galaxy/staking";
import ValidatorMoniker from "../validator-moniker/validatorMoniker";
import { parseOriginCoinAmount, parsePrettyNumber } from "../../utils";
import { DelegateButton, ManageButton, VotingPower } from "./common";

interface Props {
  validator: Validator;
  pool: Pool;
  rewards?: string;
  staked?: string;
  onClick?: () => void;
  onAction?: () => void;
}

export default function ValidatorCard(props: Props) {
  return (
    <Container>
      <Header>
        <ValidatorMoniker
          onClick={props.onClick}
          operatorAddress={props.validator.operator_address}
          moniker={props.validator.description.moniker}
        />
        {props.staked ? (
          <ManageButton onClick={props.onAction}>Manage</ManageButton>
        ) : (
          <DelegateButton onClick={props.onAction}>Delegate</DelegateButton>
        )}
      </Header>

      <Row>
        <span className="label">Status</span>
        <span className="value">{props.validator.status.split("_").pop()}</span>
      </Row>
      <Row>
        <span className="label">Voting Power</span>
        <span className="value">
          {parsePrettyNumber(
            parseFloat(parseOriginCoinAmount(props.validator.tokens)).toFixed()
          )}
          <VotingPower sx={{ ml: 1 }}>
            {(
              (parseInt(props.validator.tokens) /
                parseInt(props.pool.bonded_tokens)) *
              100
            ).toFixed(2) + "%"}
          </VotingPower>
        </span>
      </Row>
      <Row>
        <span className="label">Commission</span>
        <span className="value">
          {(
            parseFloat(props.validator.commission.commission_rates.rate) * 100
          ).toFixed(2) + "%"}
        </span>
      </Row>
      {props.staked ? (
        <Row>
          <span className="label">Staked</span>
          <span className="value">
            {parsePrettyNumber(parseOriginCoinAmount(props.staked)) + " GLX"}
          </span>
        </Row>
      ) : null}
      {props.rewards ? (
        <Row>
          <span className="label">Rewards</span>
          <span className="value">
            {(parseInt(props.rewards) / 1000000 || 0).toFixed(6) + " GLX"}
          </span>
        </Row>
      ) : null}
    </Container>
  );
}
const Row = styled("div")`
  width: auto;
  display: flex;
  align-items: center;
  margin-top: 12px;
  :first-of-type {
    margin-top: 20px;
  }
  .label {
    flex: 1;
    margin-right: 25px;
    color: #5954cc;
    font-size: 14px;
  }
  .value {
    flex: 3;
    font-size: 14px;
    color: #c9c7d7;
  }
`;

const Header = styled("div")`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled("div")`
  padding: 20px 15px;
  background-color: rgba(0, 0, 0, 0.39);
`;
