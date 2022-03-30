import React from "react";
import { Grid, styled } from "@mui/material";
import AppLayout from "../../layouts/app";
import devicesize from "../../constants/deviceSize";

const MISSION_STATE = {
  wait: "mission_wait",
  claimed: "mission_claimed",
  coming: "mission_coming"
} as const;
type MISSION_STATE = typeof MISSION_STATE[keyof typeof MISSION_STATE];

export default function AirdropClaim() {
  const [mission1, setMisson1] = React.useState<MISSION_STATE>(
    MISSION_STATE.claimed
  );
  const [mission2, setMisson2] = React.useState<MISSION_STATE>(
    MISSION_STATE.wait
  );
  const [mission3, setMisson3] = React.useState<MISSION_STATE>(
    MISSION_STATE.coming
  );
  const [mission4, setMisson4] = React.useState<MISSION_STATE>(
    MISSION_STATE.coming
  );
  const [mission5, setMisson5] = React.useState<MISSION_STATE>(
    MISSION_STATE.coming
  );

  const getProgressPerc = (img?: boolean) => {
    return (
      [mission1, mission2, mission3, mission4, mission5].filter(
        x => x === MISSION_STATE.claimed
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
                src="/assets/images/progress-light.png"
                style={{
                  marginLeft: getProgressPerc(true) - 0.5 + "%"
                }}
              />
            </div>
            <div id="footer">
              <span id="claimed">
                Claimed
                <span>
                  1470 / 2453.31<span>GLX</span>
                </span>
              </span>
              <span id="perc">{getProgressPerc()}%</span>
            </div>
          </Progress>
          <Label>My Missions</Label>
          <ClaimGrid>
            <div className={"content " + mission1}>
              <span className="mission">Mission #1</span>
              <span className="title">Claim initial 20%</span>
              <div className="airdrop-state-button">
                <span>Claimed</span>
              </div>
            </div>
            <div className={"content " + mission2}>
              <span className="mission">Mission #2</span>
              <span className="title">Stake some GLX (20%)</span>
              <div className="airdrop-state-button">
                <span>Claim</span>
              </div>
            </div>
            <div className={"content " + mission3}>
              <span className="mission">Mission #3</span>
              <span className="title">Vote on a governance proposal (20%)</span>
              <div className="airdrop-state-button">
                <span>Coming</span>
              </div>
            </div>
            <div className={"content " + mission4}>
              <span className="mission">Mission #4</span>
              <span className="title">
                Available to claim at NFT market launch (20%)
              </span>
              <div className="airdrop-state-button">
                <span>Coming</span>
              </div>
            </div>
            <div className={"content " + mission5}>
              <span className="mission">Mission #5</span>
              <span className="title">Vote on a governance proposal (20%)</span>
              <div className="airdrop-state-button">
                <span>Coming</span>
              </div>
            </div>
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
      font-family: Heebo-Regular;
    }
    .title {
      flex: 1;
      margin: 0px 31px 0px 31px;
      margin-bottom: 30px;
      font-size: 20px;
      line-height: 30px;
      color: #fff;
      font-family: Heebo-Regular;
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

  ${"." + MISSION_STATE.claimed} {
    background-color: #0d0c25 !important;
    border: 1px solid #5954cc;
    .airdrop-state-button {
      border-top: 1px solid #5954cc88;
      & span {
        color: #7d77ff;
      }
    }
  }
  ${"." + MISSION_STATE.wait} {
    background-color: #0d0c25 !important;
    .airdrop-state-button {
      background-color: #625cca;
      & span {
        color: #fff;
      }
    }
  }
  ${"." + MISSION_STATE.coming} {
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
      font-family: Heebo-Medium;
    }
    #claimed {
      display: inline-block;
      font-size: 15px;
      font-family: Heebo-Regular;
      color: #fff;
      & span {
        margin-left: 24px;
        font-family: Heebo-Medium;
        font-size: 23px;
        & span {
          margin-left: 0px;
          font-family: Heebo-Regular;
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
  font-family: Heebo-Regular;
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
