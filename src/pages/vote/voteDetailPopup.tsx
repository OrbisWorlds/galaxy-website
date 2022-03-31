import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import Button from "../../components/button";
import Donut from "../../components/charts/donut";
import {
  Popup,
  PopupLabel,
  PopupMessage,
  PopupSubLabel
} from "../../components/popup";
import Status from "../../components/status";
import { MostVoted } from "../../components/votes";
import { Vote, VoteOption } from "../../interfaces/galaxy/vote";
import { voteOptionColor } from "../../store/galaxy/vote";
import VotePopup from "./votePopup";

interface Props extends Vote {
  onClose: () => void;
}

export default function VoteDetailPopup(props: Props) {
  const [vote, setVote] = React.useState(false);
  const handleVote = () => {
    setVote(true);
  };
  return (
    <>
      <Popup onClose={props.onClose}>
        <GridWrap container>
          <Grid item xs={6}>
            <PopupSubLabel>Title</PopupSubLabel>
            <PopupMessage>
              Proposal : Let's Get People Their Airdrop! Status
            </PopupMessage>
          </Grid>
          <Grid item xs={6}>
            <PopupSubLabel>ID</PopupSubLabel>
            <PopupMessage>
              Proposal : Let's Get People Their Airdrop! Status
            </PopupMessage>
          </Grid>
          <Grid item xs={6}>
            <PopupSubLabel>Status</PopupSubLabel>
            <PopupMessage>
              <Status />
            </PopupMessage>
          </Grid>
          <Grid item xs={6}>
            <PopupSubLabel>Proposal Address</PopupSubLabel>
            <PopupMessage>
              Proposal : Let's Get People Their Airdrop! Status
            </PopupMessage>
          </Grid>
          <Grid item xs={6}>
            <PopupSubLabel>Submit Time</PopupSubLabel>
            <PopupMessage>
              Proposal : Let's Get People Their Airdrop! Status
            </PopupMessage>
          </Grid>
          <Grid item xs={6}>
            <PopupSubLabel>Deposit end</PopupSubLabel>
            <PopupMessage>
              Proposal : Let's Get People Their Airdrop! Status
            </PopupMessage>
          </Grid>
          <Grid item xs={6}>
            <PopupSubLabel>Voting start</PopupSubLabel>
            <PopupMessage>
              Proposal : Let's Get People Their Airdrop! Status
            </PopupMessage>
          </Grid>
          <Grid item xs={6}>
            <PopupSubLabel>Voting end</PopupSubLabel>
            <PopupMessage>
              Proposal : Let's Get People Their Airdrop! Status
            </PopupMessage>
          </Grid>
        </GridWrap>
        <VoteResult>
          <Donut
            width={0.5}
            secondary="#e6e6e6"
            size={110}
            color="red"
            perc={50}
          >
            <TurnOut>Turnout</TurnOut>
            <TurnOutPerc>49.5%</TurnOutPerc>
          </Donut>
          <Box sx={{ flex: 1 }}>
            <Total>
              Total <span>50.180945 GLX</span>
            </Total>
            <Options>
              <MostVoted color={voteOptionColor[VoteOption.yes]}>
                {VoteOption.yes}
              </MostVoted>
              <MostVoted color={voteOptionColor[VoteOption.no]}>
                {VoteOption.no}
              </MostVoted>
              <MostVoted color={voteOptionColor[VoteOption.noWithVeto]}>
                {VoteOption.noWithVeto}
              </MostVoted>
              <MostVoted color={voteOptionColor[VoteOption.abstain]}>
                {VoteOption.abstain}
              </MostVoted>
            </Options>
          </Box>
          <Button onClick={handleVote} sx={{ pl: 4.5, pr: 4.5 }}>
            Vote
          </Button>
        </VoteResult>
        <PopupFooter>
          <PopupLabel>Description</PopupLabel>
          <PopupMessage>
            This proposal is to allocate 125k OSMO to a multi-sig wallet
            controlled by members of the Osmosis Support Lab and Osmosis
            Ministry of Marketing. The wallet will then delegate all funding to
            Redline validation in exchange for consulting services related to
            Defi, DAOs,and structuring.{" "}
          </PopupMessage>
        </PopupFooter>
      </Popup>
      {vote && <VotePopup onClose={() => setVote(false)} />}
    </>
  );
}

const Options = styled("div")`
  margin-left: 20px;
  margin-top: 8px;
  display: flex;
  & div {
    margin-right: 20px;
  }
`;

const Total = styled("span")`
  color: #515f7f;
  font-size: 18px;
  margin-left: 20px;
  & span {
    color: #7d77ff;
    font-family: Heebo-Medium;
  }
`;

const TurnOutPerc = styled("span")`
  color: #515f7f;
  font-family: Heebo-Medium;
  font-size: 16px;
`;

const TurnOut = styled("span")`
  color: #999;
  font-family: Heebo-Medium;
  font-size: 12px;
`;

const VoteResult = styled("div")`
  padding: 30px 40px;
  margin-top: 50px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
`;

const PopupFooter = styled("div")`
  padding: 50px 80px 50px 40px;
`;

const GridWrap = styled(Grid)`
  .MuiGrid-item {
    margin-left: 40px;
    margin-top: 30px;
    max-width: calc((100% - 120px) / 2);
  }
`;
