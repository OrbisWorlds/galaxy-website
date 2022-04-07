import React from "react";
import { ButtonBase, styled } from "@mui/material";
import AppLayout from "../../layouts/app";
import devicesize from "../../constants/deviceSize";
import Table from "../../components/table/table";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchValidators,
  fetchDelegations,
  fetchPool,
  fetchDelegationValidators,
  fetchUnbondingDelegations
} from "../../store/staking";
import { Validator } from "../../interfaces/galaxy/staking";
import ValidatorMoniker from "../../components/validator-moniker/validatorMoniker";
import DelegatePopup from "./delegatePopup";
import ManagePopup from "./managePopup";
import UnDelegatePopup from "./unDelegatePopup";
import ReDelegatePopup from "./reDelegatePopup";
import { claimAllRewards, fetchRewards } from "../../store/distribution";
import { connectWallet } from "../../store/wallet";
import { Delegation } from "../../interfaces/galaxy/staking/delegation";
import { parseOriginCoinAmount } from "../../utils/commom";
import UnBonding from "../../components/stake/unBonding";

interface SelData {
  delegation?: Delegation;
  popup: "delegate" | "redelegate" | "undelegate" | "manage";
  validator: Validator;
}

export default function Stake() {
  const dispatch = useAppDispatch();
  const delegation = useAppSelector(s => s.staking.delegation);
  const wallet = useAppSelector(s => s.wallet);
  const validator = useAppSelector(s => s.staking.validator);
  const pool = useAppSelector(s => s.staking.pool);
  const reward = useAppSelector(s => s.distribution.reward);

  const [selData, setSelData] = React.useState<SelData>();

  React.useEffect(() => {
    window.onload = () => {
      dispatch(connectWallet());
    };
    dispatch(fetchPool());
    dispatch(fetchValidators());
  }, [dispatch]);

  React.useEffect(() => {
    if (!wallet.connected) {
      return;
    }
    dispatch(fetchDelegations(wallet.address));
    dispatch(fetchRewards(wallet.address));
    dispatch(fetchDelegationValidators(wallet.address));
    dispatch(fetchUnbondingDelegations(wallet.address));
  }, [wallet, dispatch]);

  const handleClosePopup = () => {
    setSelData(undefined);
  };

  const handleClaimReward = () => {
    dispatch(
      claimAllRewards({
        address: wallet.address,
        validatorAddresses: reward.rewards.map(x => x.validator_address)
      })
    );
  };

  return (
    <AppLayout wallet background={<Background />}>
      {selData?.popup === "delegate" && (
        <DelegatePopup
          validator={selData.validator}
          onClose={handleClosePopup}
        />
      )}
      {selData?.popup === "undelegate" && (
        <UnDelegatePopup
          validator={selData.validator}
          onClose={handleClosePopup}
        />
      )}
      {selData?.popup === "redelegate" && selData.delegation !== undefined && (
        <ReDelegatePopup
          delegation={selData.delegation}
          validator={selData.validator}
          onClose={handleClosePopup}
        />
      )}
      {selData?.popup === "manage" && (
        <ManagePopup
          validator={selData.validator}
          onClose={handleClosePopup}
          onDelegate={v => {
            setSelData({ popup: "delegate", validator: v });
          }}
          onUnDelegate={v => {
            setSelData({ popup: "undelegate", validator: v });
          }}
          onReDelegate={(v, d) => {
            setSelData({ popup: "redelegate", validator: v, delegation: d });
          }}
        />
      )}

      <Container>
        <Content>
          <Statictis>
            <span id="title">Galaxy Staking</span>
            <div>
              <div>
                <span id="staked">
                  Staked :{" "}
                  {wallet.connected
                    ? (delegation.totalStaked / 1000000).toFixed(6)
                    : "-"}{" "}
                  GLX
                </span>
                <span id="apr">
                  GLX Staking APR
                  <span>
                    {Math.floor(
                      ((500000000000000 * 0.2) / parseInt(pool.bonded_tokens)) *
                        100
                    )}
                    %
                  </span>
                </span>
              </div>
              <ButtonBase
                id="reward"
                onClick={handleClaimReward}
                disabled={!wallet.connected || reward.totalReward === 0}
              >
                Claim Reward :{" "}
                {wallet.connected
                  ? (reward.totalReward / 1000000).toFixed(6)
                  : "-"}{" "}
                GLX
              </ButtonBase>
            </div>
          </Statictis>

          {delegation.unbondingDelegations.length >= 1 && (
            <>
              <Label>Undelegating</Label>
              {delegation.unbondingDelegations.map((x, i) => {
                return (
                  <UnBonding
                    key={i.toString()}
                    unBonding={x}
                    moniker={
                      validator.validators.filter(
                        y => y.operator_address === x.validator_address
                      )[0]?.description.moniker
                    }
                    onFormatBalance={b => parseOriginCoinAmount(b)}
                  />
                );
              })}
            </>
          )}

          <Label>Delegated Vaildators</Label>

          <Table
            data={delegation.validators}
            th={[
              {
                l: "Validator",
                render: (d, i) => (
                  <ValidatorMoniker icon="" moniker={d.description.moniker} />
                )
              },
              { l: "Status", render: x => x.status.split("_").pop() },
              {
                l: "Voting Power",
                render: (d, i) =>
                  (
                    (parseInt(d.tokens) / parseInt(pool.bonded_tokens)) *
                    100
                  ).toFixed(1) + "%"
              },
              {
                l: "Commission",
                render: (d, i) =>
                  parseFloat(d.commission.commission_rates.rate) * 100 + "%"
              },
              {
                l: "Staked Coins",
                render: (d, i) =>
                  (
                    parseInt(
                      delegation.delegations.filter(
                        x =>
                          x.delegation.validator_address === d.operator_address
                      )[0]?.balance.amount
                    ) / 1000000
                  ).toFixed(6) + " GLX"
              },
              {
                l: "Rewards",
                render: (d, i) =>
                  (
                    parseInt(
                      reward.rewards.filter(
                        x => x.validator_address === d.operator_address
                      )[0]?.reward[0]?.amount
                    ) / 1000000 || 0
                  ).toFixed(6) + " GLX"
              },
              {
                l: "",
                render: (d, i) => (
                  <Manage
                    onClick={() => {
                      setSelData({ popup: "manage", validator: d });
                    }}
                  >
                    Manage
                  </Manage>
                )
              }
            ]}
          />

          <Label>Vaildators</Label>

          <Table
            data={validator.validators}
            th={[
              {
                width: 10,
                l: "Rank",
                render: (d, i) => <Rank>{i + 1}</Rank>
              },
              {
                width: 45,
                align: "left",
                l: "Validator",
                render: (d, i) => (
                  <ValidatorMoniker
                    align="flex-start"
                    icon=""
                    moniker={d.description.moniker}
                  />
                )
              },
              {
                l: "Voting Power",
                render: d =>
                  (
                    (parseInt(d.tokens) / parseInt(pool.bonded_tokens)) *
                    100
                  ).toFixed(1) + "%"
              },
              {
                l: "Commission",
                render: (d, i) =>
                  parseFloat(d.commission.commission_rates.rate) * 100 + "%"
              },
              {
                l: "",
                render: (d, i) => (
                  <Delegate
                    onClick={() => {
                      setSelData({
                        popup: "delegate",
                        validator: d
                      });
                    }}
                  >
                    Delegate
                  </Delegate>
                )
              }
            ]}
          />
        </Content>
      </Container>
    </AppLayout>
  );
}

const Rank = styled("span")`
  font-size: 14px;
  color: #fff;
  font-family: "Heebo-Medium";
`;

const Delegate = styled(ButtonBase)`
  border-radius: 18px;
  background-color: #2a267b;
  color: #ffffff;
  padding: 10px 18px;
  font-size: 13;
`;

const Manage = styled(ButtonBase)`
  border-radius: 18px;
  background-color: transparent;
  border: 1px solid #7d77ff;
  padding: 10px 18px;
  font-size: 13;
  color: #7d77ff;
`;

const Statictis = styled("div")`
  border-radius: 8px;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(#625cca, #413c9f);
  align-self: stretch;
  padding: 30px 30px;
  & div {
    align-items: center;
    display: flex;
    & div {
      align-items: flex-end;
      flex-direction: column;
    }
  }
  #title {
    font-size: 22px;
    color: #fff;
    font-family: "Heebo-Medium";
  }
  #staked {
    font-size: 13px;
    color: #8f8aff;
  }
  #apr {
    display: flex;
    font-size: 13px;
    margin-top: 8px;
    color: #fff;
    & span {
      line-height: 24px;
      font-family: "Heebo-Medium";
      font-size: 22px;
      margin-left: 14px;
      color: #f4f3f6;
    }
  }
  #reward {
    margin-left: 40px;
    font-size: 14px;
    line-height: 25px;
    font-family: "Heebo-Medium";
    color: #2a267b;
    background-color: #fff;
    border-radius: 20px;
    padding: 10px 28px;
  }
`;

const Label = styled("p")`
  font-size: 24px;
  color: #f4f3f6;
  font-family: "Heebo-Medium";
  margin-top: 60px;
`;

const Content = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${devicesize.desktopMin};
  margin: auto auto;
  margin-bottom: 100px;
  padding: 0px 20px;
  @media (min-width: ${devicesize.desktopMin}) {
    padding: 0px;
  }
`;

const Container = styled("div")`
  flex: 1;
  padding-top: 140px;
`;

const Background = styled("div")`
  min-height: 100vh;
  background-image: url(/assets/images/airdrop-claim-bg.jpg);
  background-size: contain;
  background-repeat: repeat;
`;
