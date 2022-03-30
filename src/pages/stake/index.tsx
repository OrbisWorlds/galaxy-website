import React from "react";
import { ButtonBase, styled } from "@mui/material";
import AppLayout from "../../layouts/app";
import devicesize from "../../constants/deviceSize";
import Table from "../../components/table/table";
import {
  DelegatedValidators,
  Validators
} from "../../interfaces/galaxy/staking";
import ValidatorMoniker from "../../components/validator-moniker/validatorMoniker";

export default function Stake() {
  const [staked, setStaked] = React.useState("0");
  const [apr, setApr] = React.useState("0");
  const [reward, setReward] = React.useState("0.0");
  const [validators, setValidators] = React.useState<Validators>([]);
  const [delegatedValidators, setDelegatedValidators] =
    React.useState<DelegatedValidators>([]);

  React.useEffect(() => {
    setDelegatedValidators([
      {
        delegator_address: "galaxy1111",
        validator_address: "galaxyvaloper1111",
        moniker: "test1",
        voting_power: 10.0,
        rewards: 10.0,
        staked: 50.0,
        status: "BONDED",
        commission: 0.5,
        website: "",
        details: ""
      },
      {
        delegator_address: "galaxy1111",
        validator_address: "galaxyvaloper1111",
        moniker: "test1",
        voting_power: 10.0,
        rewards: 10.0,
        staked: 50.0,
        status: "BONDED",
        commission: 0.5,
        website: "",
        details: ""
      },
      {
        delegator_address: "galaxy1111",
        validator_address: "galaxyvaloper1111",
        moniker: "test1",
        voting_power: 10.0,
        rewards: 10.0,
        staked: 50.0,
        status: "BONDED",
        commission: 0.5,
        website: "",
        details: ""
      }
    ]);

    setValidators([
      {
        rank: 1,
        delegator_address: "galaxy1111",
        validator_address: "galaxyvaloper1111",
        moniker: "test1",
        voting_power: 10.0,
        commission: 0.5,
        website: "",
        details: ""
      },
      {
        rank: 1,
        delegator_address: "galaxy1111",
        validator_address: "galaxyvaloper1111",
        moniker: "test1",
        voting_power: 10.0,
        commission: 0.5,
        website: "",
        details: ""
      },
      {
        rank: 1,
        delegator_address: "galaxy1111",
        validator_address: "galaxyvaloper1111",
        moniker: "test1",
        voting_power: 10.0,
        commission: 0.5,
        website: "",
        details: ""
      },
      {
        rank: 1,
        delegator_address: "galaxy1111",
        validator_address: "galaxyvaloper1111",
        moniker: "test1",
        voting_power: 10.0,
        commission: 0.5,
        website: "",
        details: ""
      }
    ]);
  }, []);

  return (
    <AppLayout wallet background={<Background />}>
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
          <Table
            data={delegatedValidators}
            th={[
              {
                l: "Validator",
                render: (d, i) => (
                  <ValidatorMoniker icon="" moniker={d.moniker} />
                )
              },
              { l: "Status", key: "status" },
              { l: "Voting Power", key: "voting_power" },
              { l: "Commission", key: "commission" },
              { l: "Staked Coins", key: "staked" },
              { l: "Rewards", key: "rewards" },
              { l: "", render: (d, i) => <Manage>Manage</Manage> }
            ]}
          />

          {
            //Vaildators
          }

          <Label>Vaildators</Label>
          <Table
            data={validators}
            th={[
              {
                width: 10,
                l: "Rank",
                key: "rank",
                render: (d, i) => <Rank>{d.rank}</Rank>
              },
              {
                width: 45,
                align: "left",
                l: "Validator",
                render: (d, i) => (
                  <ValidatorMoniker
                    align="flex-start"
                    icon=""
                    moniker={d.moniker}
                  />
                )
              },
              {
                l: "Voting Power",
                key: "voting_power"
              },
              { l: "Commission", key: "commission" },
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
  background-size: cover;
  background-repeat: no-repeat;
`;
