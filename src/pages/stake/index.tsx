import React from "react";
import { ButtonBase, styled } from "@mui/material";
import AppLayout from "../../layouts/app";
import devicesize from "../../constants/deviceSize";
import Table from "../../components/table/table";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import stakingSlice from "../../store/staking";
import { fetchValidators, fetchPool } from "../../store/staking";
import { Validator } from "../../interfaces/galaxy/staking";
import ValidatorMoniker from "../../components/validator-moniker/validatorMoniker";
import DelegatePopup from "./delegatePopup";
import ManagePopup from "./managePopup";
import UnDelegatePopup from "./unDelegatePopup";
import ReDelegatePopup from "./reDelegatePopup copy";

interface SelData {
  popup: "delegate" | "redelegate" | "undelegate" | "manage";
  validator: Validator;
}

export default function Stake() {
  const dispatch = useAppDispatch();
  const validator = useAppSelector(s => s.staking.validator);
  const pool = useAppSelector(s => s.staking.pool);
  const [staked, setStaked] = React.useState("0");
  const [apr, setApr] = React.useState("0");
  const [reward, setReward] = React.useState("0.0");

  const [selData, setSelData] = React.useState<SelData>();

  React.useEffect(() => {
    dispatch(fetchPool());
    dispatch(fetchValidators());
  }, []);

  const handleClosePopup = () => {
    setSelData(undefined);
  };

  return (
    <AppLayout wallet background={<Background />}>
      {selData?.popup === "delegate" && (
        <DelegatePopup onClose={handleClosePopup} />
      )}
      {selData?.popup === "undelegate" && (
        <UnDelegatePopup onClose={handleClosePopup} />
      )}
      {selData?.popup === "redelegate" && (
        <ReDelegatePopup onClose={handleClosePopup} />
      )}
      {selData?.popup === "manage" && (
        <ManagePopup
          validator={selData.validator}
          onClose={handleClosePopup}
          onUnDelegate={v => {
            setSelData({ popup: "undelegate", validator: v });
          }}
          onReDelegate={v => {
            setSelData({ popup: "redelegate", validator: v });
          }}
        />
      )}

      <Container>
        <Content>
          <Statictis>
            <span id="title">Galaxy Staking</span>
            <div>
              <div>
                <span id="staked">Staked : {staked} GLX</span>
                <span id="apr">
                  GLX Staking APR
                  <span>{apr}%</span>
                </span>
              </div>
              <span id="reward">Claim Reward : {reward} GLX</span>
            </div>
          </Statictis>

          {
            //Delegated Vaildators
          }

          <Label>Delegated Vaildators</Label>

          {/*
     <Table
            data={delegatedValidators}
            th={[
              {
                l: "Validator",
                render: (d, i) => (
                  <ValidatorMoniker icon="" moniker={d.description.moniker} />
                )
              },
              { l: "Status", key: "staked" },
              //   { l: "Voting Power", key: "voting_power" },
              { l: "Commission", key: "" },
              { l: "Staked Coins", key: "staked" },
              { l: "Rewards", key: "rewards" },
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
  */}
          {
            //Vaildators
          }

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
                render: x =>
                  (parseInt(x.tokens) / parseInt(pool.bonded_tokens)) * 100 +
                  "%"
              },
              {
                l: "Commission",
                render: (d, i) =>
                  parseFloat(d.commission.commission_rates.rate) * 100 + "%"
              },
              { l: "", render: (d, i) => <Delegate>Delegate</Delegate> }
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
  font-family: Heebo-Medium;
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
    font-family: Heebo-Medium;
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
      font-family: Heebo-Medium;
      font-size: 22px;
      margin-left: 14px;
      color: #f4f3f6;
    }
  }
  #reward {
    margin-left: 40px;
    font-size: 14px;
    line-height: 25px;
    font-family: Heebo-Medium;
    color: #2a267b;
    background-color: #fff;
    border-radius: 20px;
    padding: 10px 28px;
  }
`;

const Label = styled("p")`
  font-size: 24px;
  color: #f4f3f6;
  font-family: Heebo-Medium;
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
