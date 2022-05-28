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
import { parseOriginCoinAmount, parsePrettyNumber } from "../../utils/commom";
import {
  DelegateButton,
  ManageButton,
  VotingPower,
  UnBonding
} from "../../components/stake";
import useDeviceType from "../../hooks/useDeviceType";
import ValidatorCard from "../../components/stake/validatorCard";

interface SelData {
  delegation?: Delegation;
  popup: "delegate" | "redelegate" | "undelegate" | "manage";
  validator: Validator;
}

export default function Stake() {
  const dispatch = useAppDispatch();
  const deviceType = useDeviceType();
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
    dispatch(connectWallet());

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
                    ? parsePrettyNumber(
                        parseOriginCoinAmount(delegation.totalStaked)
                      )
                    : "-"}{" "}
                  GLX
                </span>
                <span id="apr">
                  GLX Staking APR
                  <span>
                    {parsePrettyNumber(
                      Math.floor(
                        ((500000000000000 * 0.2) /
                          parseInt(pool.bonded_tokens)) *
                          100
                      )
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
                  ? parsePrettyNumber(parseOriginCoinAmount(reward.totalReward))
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
                    onFormatBalance={b =>
                      parsePrettyNumber(parseOriginCoinAmount(b))
                    }
                  />
                );
              })}
            </>
          )}


           <Label>Delegated Validators</Label>
          {deviceType === "mobile" ? (
            delegation.validators.map((x, i) => {
              return (
                <ValidatorCard
                  key={i.toString()}
                  validator={x}
                  pool={pool}
                  staked={
                    delegation.delegations.filter(
                      y => y.delegation.validator_address === x.operator_address
                    )[0]?.balance.amount
                  }
                  rewards={
                    reward.rewards.filter(
                      y => y.validator_address === x.operator_address
                    )[0]?.reward[0]?.amount
                  }
                  onClick={() => {
                    setSelData({ popup: "manage", validator: x });
                  }}
                  onAction={() => {
                    setSelData({ popup: "manage", validator: x });
                  }}
                />
              );
            })
          ) : (
            <Table
              data={delegation.validators}
              th={[
                {
                  l: "Validator",
                  align: "left",
                  render: (d, i) => (
                    <ValidatorMoniker
                      align="flex-start"
                      operatorAddress={d.operator_address}
                      moniker={d.description.moniker}
                    />
                  )
                },
                {
                  width: 10,
                  l: "Status",
                  render: x => {
                    return (
                      <span>
                        {x.status.split("_").pop()}
                        {x.jailed ? (
                          <Jailed>
                            <br />
                            <img
                              src="/public/assets/images/jailed.svg"
                              alt="jailed"
                            />
                            JAILED
                          </Jailed>
                        ) : (
                          ""
                        )}
                      </span>
                    );
                  }
                },
                {
                  l: "Voting Power",
                  render: (d, i) => (
                    <>
                      {parsePrettyNumber(
                        parseFloat(parseOriginCoinAmount(d.tokens)).toFixed()
                      )}
                      <br />
                      <VotingPower>
                        {(
                          (parseInt(d.tokens) / parseInt(pool.bonded_tokens)) *
                          100
                        ).toFixed(2) + "%"}
                      </VotingPower>
                    </>
                  )
                },
                {
                  l: "Commission",
                  width: 10,
                  render: (d, i) =>
                    (
                      parseFloat(d.commission.commission_rates.rate) * 100
                    ).toFixed(2) + "%"
                },
                {
                  l: "Staked Coins",
                  render: (d, i) =>
                    parsePrettyNumber(
                      parseOriginCoinAmount(
                        delegation.delegations.filter(
                          x =>
                            x.delegation.validator_address ===
                            d.operator_address
                        )[0]?.balance.amount
                      )
                    ) + " GLX"
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
                  width: 10,
                  render: (d, i) => (
                    <ManageButton
                      onClick={() => {
                        setSelData({ popup: "manage", validator: d });
                      }}
                    >
                      Manage
                    </ManageButton>
                  )
                }
              ]}
            />
          )}

          <Label>Validators</Label>

          {deviceType === "mobile" ? (
            validator.validators.map((x, i) => {
              return (
                <ValidatorCard
                  key={i.toString()}
                  validator={x}
                  pool={pool}
                  onClick={() => {
                    setSelData({ popup: "manage", validator: x });
                  }}
                  onAction={() => {
                    setSelData({
                      popup: "delegate",
                      validator: x
                    });
                  }}
                />
              );
            })
          ) : (
            <Table
              data={validator.validators}
              th={[
                {
                  width: 5,
                  l: "#",
                  render: (d, i) => <Rank>{i + 1}</Rank>
                },
                {
                  width: 45,
                  align: "left",
                  l: "Validator",
                  render: (d, i) => (
                    <ValidatorMoniker
                      onClick={() => {
                        setSelData({ popup: "manage", validator: d });
                      }}
                      operatorAddress={d.operator_address}
                      align="flex-start"
                      moniker={d.description.moniker}
                    />
                  )
                },
                {
                  l: "Status",
                  render: x => {
                    return (
                      <span>
                        {x.status.split("_").pop()}
                        {x.jailed ? (
                          <Jailed>
                            <br />
                            <img
                              src="/public/assets/images/jailed.svg"
                              alt="jailed"
                            />
                            JAILED
                          </Jailed>
                        ) : (
                          ""
                        )}
                      </span>
                    );
                  }
                },
                {
                  l: "Voting Power",
                  render: d => (
                    <>
                      {parsePrettyNumber(
                        parseFloat(parseOriginCoinAmount(d.tokens)).toFixed()
                      )}
                      <br />
                      <VotingPower>
                        {(
                          (parseInt(d.tokens) / parseInt(pool.bonded_tokens)) *
                          100
                        ).toFixed(2) + "%"}
                      </VotingPower>
                    </>
                  )
                },
                {
                  l: "Commission",
                  render: (d, i) =>
                    (
                      parseFloat(d.commission.commission_rates.rate) * 100
                    ).toFixed(2) + "%"
                },
                {
                  l: "",
                  render: (d, i) => (
                    <DelegateButton
                      onClick={() => {
                        setSelData({
                          popup: "delegate",
                          validator: d
                        });
                      }}
                    >
                      Delegate
                    </DelegateButton>
                  )
                }
              ]}
            />
          )}
        </Content>
      </Container>
    </AppLayout>
  );
}

const Jailed = styled("span")`
  color: #ff2f2f;
  font-size: 12px;
  font-family: Heebo-Medium;
  & img {
    width: 10px;
    margin-right: 2px;
    height: 10px;
    object-fit: cover;
  }
`;

const Rank = styled("span")`
  font-size: 14px;
  color: #fff;
  font-family: "Heebo-Medium";
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
    @media (max-width: ${devicesize.tabletMin}) {
      flex-direction: column;
      & span {
        margin-left: 0px;
      }
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
    @media (max-width: ${devicesize.tabletMin}) {
      display: none;
    }
  }
  @media (max-width: ${devicesize.tabletMin}) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 15px;
    & div {
      & div {
        align-items: start;
        flex-direction: column;
      }
    }
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
  background-image: url(/public/assets/images/airdrop-claim-bg.jpg);
  background-size: contain;
  background-repeat: repeat;
`;
