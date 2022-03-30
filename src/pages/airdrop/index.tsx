import { Box, ButtonBase, InputBase, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/app";

export default function Airdrop() {
  const navigate = useNavigate();
  const [address, setAddress] = React.useState("");
  const [cosmoshub, setCosmoshub] = React.useState("0");
  const [osmosisStake, setOsmosisStake] = React.useState("0");
  const [osmosisPool, setOsmosisPool] = React.useState("0");
  const [searched, setSearched] = React.useState(false);

  React.useEffect(() => {
    if (!address) {
      setCosmoshub("0");
      setOsmosisStake("0");
      setOsmosisPool("0");
      setSearched(false);
    }
  }, [address]);

  const handleDetectClipboard = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!address) {
      navigator.clipboard
        .readText()
        .then(t => {
          if (t && (t.startsWith("cosmos") || t.startsWith("osmo"))) {
            setAddress(t);
          }
        })
        .catch(console.log);
    }
  };

  const handleCheckClaimAmount = (e: React.MouseEvent) => {
    setSearched(true);
  };

  return (
    <AppLayout background={<Background />}>
      <Container>
        <Title>Galaxy Airdrop</Title>
        <Message>Check your amount</Message>

        <Address>
          <InputBase
            fullWidth
            value={address}
            onChange={e => setAddress(e.target.value)}
            onClick={handleDetectClipboard}
            placeholder="Enter your cosmos or osmosis address"
          />
          <ButtonBase disabled={!address} onClick={handleCheckClaimAmount}>
            Check
          </ButtonBase>
        </Address>
        <Content>
          <ContentLine
            src="/assets/images/airdrop-content-line.png"
            alt="line"
          />
          <ContentLine
            src="/assets/images/airdrop-content-line-2.png"
            alt="line"
          />
          <TotalAmount>
            Total Amount :{" "}
            <span>
              {searched
                ? parseInt(cosmoshub) +
                  parseInt(osmosisStake) +
                  parseInt(osmosisPool)
                : "-"}{" "}
              GLX
            </span>
          </TotalAmount>

          <Chain>
            <img src="/assets/images/cosmoshub.svg" alt="cosmos" />
            <span>Airdrop for Atom Staker</span>
            <span>{searched ? cosmoshub : "-"} GLX</span>
          </Chain>
          <Chain>
            <img src="/assets/images/osmosis.svg" alt="osmosis" />
            <span>Airdrop for Osmosis Staker</span>
            <span>{searched ? osmosisStake : "-"} GLX</span>
          </Chain>
          <Chain sx={{ borderBottom: "none" }}>
            <img src="/assets/images/osmosis.svg" alt="osmosis" />
            <span>Airdrop for Osmosis LP</span>
            <span>{searched ? osmosisPool : "-"} GLX</span>
          </Chain>

          <Claim
            onClick={() => {
              navigate("/airdrop/claim");
            }}
            disabled={!searched}
          >
            Check Claim Missions
          </Claim>

          <Schedules>
            <div>
              <span>Cosmos Snapshot</span>
              <span>2021-06-18 17:00 UTC</span>
            </div>
            <div>
              <span>Osmosis Snapshot</span>
              <span>2022-01-01 00:00 UTC</span>
            </div>
          </Schedules>
        </Content>
      </Container>
    </AppLayout>
  );
}

const Schedules = styled("div")`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  border-radius: 4px;
  padding: 18px 25px;
  background-color: rgba(255, 255, 255, 0.3);
  & div {
    display: flex;
    justify-content: space-between;
    & span {
      :last-child {
        text-align: right;
      }
      flex: 1;
      font-size: 13px;
      color: #222222;
      font-family: Heebo-Regular;
    }
  }
  @media (min-width: 768px) {
    & div {
      justify-content: space-evenly;
      & span {
        flex: none;
      }
    }
  }
`;

const Claim = styled(ButtonBase)`
  background-color: #1e184f;
  align-self: center;
  border-radius: 4px;
  padding: 15px 42px;
  color: #fff;
  margin-top: 25px;
  font-family: Heebo-Regular;
  @media (min-width: 900px) {
    padding: 15px 64px;
  }
  :disabled {
    color: #544c8f;
  }
`;

const Chain = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 0px;
  border-bottom: 1px solid #925ae7;
  & img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
  }
  & span {
    flex: 1;
    color: #f4f3f6;
    font-size: 14px;
    font-family: Heebo-Regular;
    :last-child {
      flex: none;
      color: #fff;
      font-size: 15px;
      min-width: 30px;
      font-family: Heebo-Medium;
    }
  }
`;

const TotalAmount = styled("span")`
  color: #f4f3f6;
  margin-bottom: 20px;
  font-size: 20px;
  align-self: center;
  font-family: Heebo-Regular;
  & span {
    font-family: Heebo-Bold;
    font-size: 20px;
    color: #fff;
  }
`;

const ContentLine = styled("img")`
  position: absolute;
  margin-top: 1px;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
`;

const Content = styled(Box)`
  position: relative;
  border-radius: 4px;
  margin: 25px 0px 70px 0px;
  display: flex;
  flex-direction: column;
  padding: 30px 25px 20px 25px;
  background-image: linear-gradient(#7731c8, #5954cc);
`;

const Address = styled(Box)`
  border: 0.5px solid #7731c8;
  border-radius: 4px;
  background-color: #09052a22;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  & button {
    background-color: #7731c8;
    width: 70px;
    padding-right: 20px;
    padding-left: 20px;
    color: #faeae8;
    font-size: 14px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    font-family: Heebo-Regular;
    @media (min-width: 900px) {
      padding-right: 30px;
      padding-left: 30px;
    }
  }
  & input {
    font-size: 14px;
    padding: 13px;
    padding-top: 17px;
    color: #8f3feb;
    font-family: Heebo-Medium;
  }
`;

const Message = styled("p")`
  color: #999;
  font-size: 18px;
  margin: 0px auto 40px auto;
  font-family: Heebo-Regular;
`;

const Title = styled("p")`
  display: block;
  color: #fff;
  font-family: Heebo-Bold;
  font-size: 36px;
  margin: 125px auto 0px auto;
`;

const Container = styled(Box)`
  display: flex;
  margin: 0px auto;
  flex-direction: column;
  padding: 0px 20px;
  height: 100%;
  width: 100%;
  max-width: 620px;
`;

const Background = styled("div")`
  min-height: 100vh;
  background-image: url(/assets/images/airdrop-bg-m.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  @media (min-width: 768px) {
    background-image: url(/assets/images/airdrop-bg.jpg);
  }
`;
