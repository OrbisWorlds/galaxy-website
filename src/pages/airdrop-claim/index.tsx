import React from "react";
import { Grid, styled } from "@mui/material";
import AppLayout from "../../layouts/app";
import devicesize from "../../constants/deviceSize";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { connectWallet } from "../../store/wallet";
import { fetchClaimRecord, fetchTotalClaimable } from "../../store/clairdrop";
import { parseOriginCoinAmount } from "../../utils";
import {
  ClaimMissionState,
  ClaimMissionStateLabel
} from "../../interfaces/galaxy/clairdrop";
import config from "../../constants/config";

export default function AirdropClaim() {
  const dispatch = useAppDispatch();
  const wallet = useAppSelector(s => s.wallet);
  const clairdrop = useAppSelector(s => s.clairdrop);
  const [mission1, setMisson1] = React.useState<ClaimMissionState>(
    ClaimMissionState.notEligible
  );
  const [mission2, setMisson2] = React.useState<ClaimMissionState>(
    ClaimMissionState.notEligible
  );
  const [mission3, setMisson3] = React.useState<ClaimMissionState>(
    ClaimMissionState.notEligible
  );
  const [mission4, setMisson4] = React.useState<ClaimMissionState>(
    ClaimMissionState.notEligible
  );
  const [mission5, setMisson5] = React.useState<ClaimMissionState>(
    ClaimMissionState.notEligible
  );

  React.useEffect(() => {
    window.onload = () => {
      dispatch(connectWallet());
    };
    dispatch(connectWallet());
  }, [dispatch]);

  React.useEffect(() => {
    if (!wallet.connected) return;

    dispatch(fetchClaimRecord(wallet.address));
    dispatch(fetchTotalClaimable(wallet.address));
  }, [wallet, dispatch]);

  React.useEffect(() => {
    setMisson1(
      clairdrop.eligible
        ? ClaimMissionState.claimed
        : ClaimMissionState.notEligible
    );
    setMisson2(
      clairdrop.eligible
        ? clairdrop.claimRecord.action_completed[0]
          ? ClaimMissionState.claimed
          : ClaimMissionState.eligible
        : ClaimMissionState.notEligible
    );
    setMisson3(
      clairdrop.eligible
        ? clairdrop.claimRecord.action_completed[1]
          ? ClaimMissionState.claimed
          : ClaimMissionState.eligible
        : ClaimMissionState.notEligible
    );
    setMisson4(
      clairdrop.eligible
        ? ClaimMissionState.coming
        : ClaimMissionState.notEligible
    );
    setMisson5(
      clairdrop.eligible
        ? ClaimMissionState.coming
        : ClaimMissionState.notEligible
    );
  }, [clairdrop]);

  const getClaimedAmount = React.useCallback(() => {
    if (!clairdrop.eligible) {
      return "0";
    }
    const glx = clairdrop.claimRecord.inital_claimable_amount.filter(
      x => x.denom === config.coinOriginDenom
    )[0];

    if (!glx) {
      return "0";
    }

    let amountPerAction = (parseInt(glx.amount) * 1) / 4;

    return String(
      amountPerAction +
        clairdrop.claimRecord.action_completed.filter(x => x).length *
          amountPerAction
    );
  }, [clairdrop]);

  const getProgressPerc = (img?: boolean) => {
    return (
      [clairdrop.eligible, ...clairdrop.claimRecord.action_completed].filter(
        x => x
      ).length * 20
    );
  };

  return (
    <AppLayout wallet background={<Background />}>
      <Container>
        <Content>
          <Label>My Progress</Label>
          <Progress>
            <div id="bar">
              <span style={{ width: getProgressPerc() + "%" }} />
              <img
                alt="light"
                src="/public/assets/images/progress-light.png"
                style={{
                  marginLeft: getProgressPerc(true) - 0.5 + "%"
                }}
              />
            </div>
            <div id="footer">
              <span id="claimed">
                Claimed
                <span>
                  {parseOriginCoinAmount(getClaimedAmount())} /{" "}
                  {parseOriginCoinAmount(
                    parseInt(clairdrop.totalClaimable.amount) +
                      parseInt(getClaimedAmount())
                  )}
                  <span> GLX</span>
                </span>
              </span>
              <span id="perc">{getProgressPerc()}%</span>
            </div>
          </Progress>
          <Label>My Missions</Label>
          <ClaimGrid>
            {[mission1, mission2, mission3, mission4, mission5].map((x, i) => {
              let label = "";
              switch (i) {
                case 0:
                  label = "Claim initial 20%";
                  break;
                case 1:
                  label = "Stake some GLX (20%)";
                  break;
                case 2:
                  label = "Vote on a governance proposal (20%)";
                  break;
                case 3:
                  label = "Available to claim at STORY system launch (20%)";
                  break;
                case 4:
                  label = "Available to claim at NFT market launch (20%)";
                  break;
              }
              return (
                <div className={"content " + x}>
                  <span className="mission">Mission #{i + 1}</span>
                  <span className="title">{label}</span>
                  <div className="airdrop-state-button">
                    <span>
                      {x === ClaimMissionState.notEligible && (
                        <img
                          className="danger"
                          src="/public/assets/images/danger.svg"
                          alt="danger"
                        />
                      )}
                      {ClaimMissionStateLabel[x]}
                    </span>
                  </div>
                </div>
              );
            })}
          </ClaimGrid>
        </Content>
      </Container>
    </AppLayout>
  );
}

const ClaimGrid = styled(Grid)`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  flex-direction: row;
  .content {
    display: flex;
    flex-direction: column;
    width: calc((100% - 60px) / 3);
    margin-right: 30px;
    border-radius: 8px;
    background-color: #0d0c2599;
    .danger {
      width: 14px;
      height: 14px;
      margin-right: 10px;
    }
    :nth-of-type(n + 4) {
      margin-top: 30px;
    }
    :nth-of-type(3) {
      margin-right: 0px;
    }
    .mission {
      margin: 40px 31px 0px 31px;
      font-size: 15px;
      line-height: 26px;
      color: #999999;
      font-family: "Heebo-Regular";
    }
    .title {
      flex: 1;
      margin: 0px 31px 0px 31px;
      margin-bottom: 30px;
      font-size: 20px;
      line-height: 30px;
      color: #fff;
      font-family: "Heebo-Regular";
    }
    .airdrop-state-button {
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      padding: 20px;
      text-align: center;
      & span {
        font-size: 14px;
      }
    }
  }

  @media (max-width: ${devicesize.tabletMin}) {
    flex-direction: column;
    .content {
      margin: 0px 0px 30px 0px !important;
      width: auto;
      align-self: stretch;
    }
  }
  ${"." + ClaimMissionState.notEligible} {
    background-color: #0d0c25 !important;
    .airdrop-state-button {
      border-top: 1px solid #5954cc88;
      color: #fd8176;
    }
  }
  ${"." + ClaimMissionState.claimed} {
    background-color: #0d0c25 !important;
    border: 1px solid #5954cc;
    .airdrop-state-button {
      border-top: 1px solid #5954cc88;
      & span {
        color: #7d77ff;
      }
    }
  }
  ${"." + ClaimMissionState.eligible} {
    background-color: #0d0c25 !important;
    .airdrop-state-button {
      background-color: #625cca;
      & span {
        color: #fff;
      }
    }
  }
  ${"." + ClaimMissionState.coming} {
    background-color: #0d0c25 !important;
    .airdrop-state-button {
      border-top: 1px solid #5954cc44;
      & span {
        color: #999999;
      }
    }
  }
`;

const Progress = styled("div")`
  border-radius: 8px;
  align-self: stretch;
  background: linear-gradient(#625cca, #413c9f);
  align-self: stretch;
  padding: 33px 30px;
  #footer {
    display: flex;
    align-items: center;
    margin-top: 36px;
    justify-content: space-between;
    #perc {
      font-size: 18px;
      color: #7d77ff;
      font-family: "Heebo-Medium";
    }
    #claimed {
      display: inline-block;
      font-size: 15px;
      font-family: "Heebo-Regular";
      color: #fff;
      & span {
        margin-left: 24px;
        font-family: "Heebo-Medium";
        font-size: 23px;
        & span {
          margin-left: 0px;
          font-family: "Heebo-Regular";
        }
      }
    }
  }

  #bar {
    width: 100%;
    border-radius: 6px;
    background-color: #1e184f;
    height: 12px;
    position: relative;
    & img {
      margin-top: -2px;
      height: 16px;
      width: 11px;
      position: absolute;
      z-index: 2;
      top: 0;
      bottom: 0;
    }
    & span {
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      background: linear-gradient(to right, #7d77ff, #c7c4ff);
    }
  }
`;

const Label = styled("p")`
  font-size: 20px;
  margin-top: 60px;
  color: #f4f3f6;
  font-family: "Heebo-Regular";
  :first-of-type {
    margin-top: 180px;
  }
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
`;

const Background = styled("div")`
  min-height: 100vh;
  background-image: url(/assets/images/airdrop-claim-bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
`;
