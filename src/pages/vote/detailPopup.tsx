import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import Button from "../../components/button";
import {
  Popup,
  PopupLabel,
  PopupMessage,
  PopupSubLabel
} from "../../components/popup";
import { MostVoted } from "../../components/gov";
import {
  Proposal,
  ProposalStatus,
  VoteOption,
  VoteOptionLabel
} from "../../interfaces/galaxy/gov";
import { voteOptionColor } from "../../constants/colors";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProposalTally } from "../../store/gov";
import {
  getVotePerc,
  parseOriginCoinAmount,
  parsePrettyNumber
} from "../../utils";
import { PieChart, Pie } from "recharts";
import { Status } from "../../components/gov";
import deviceSize from "../../constants/deviceSize";
import useDeviceType from "../../hooks/useDeviceType";
interface Props {
  onProposal: () => void;
  onDeposit?: () => void;
  onClose: () => void;
  proposal: Proposal;
}

export default function DetailPopup(props: Props) {
  const dispatch = useAppDispatch();
  const deviceType = useDeviceType();
  const tally =
    useAppSelector(s => s.gov.proposal.tally)[props.proposal.proposal_id] || {};

  React.useEffect(() => {
    dispatch(fetchProposalTally(props.proposal.proposal_id));
  }, [props.proposal, dispatch]);

  const renderTotalVoted = (
    <Total>
      Total{" "}
      <span>
        {parsePrettyNumber(
          parseOriginCoinAmount(
            Object.keys(tally).reduce((a, b) => parseInt(tally[b]) + a, 0)
          )
        )}{" "}
        GLX
      </span>
    </Total>
  );

  return (
    <>
      <Popup onClose={props.onClose}>
        <Title>
          <span className="id">#{props.proposal.proposal_id}</span>
          <br />
          {props.proposal.content.title}{" "}
        </Title>
        <GridWrap container>
          <Grid item xs={6}>
            <PopupSubLabel>Status</PopupSubLabel>
            <Status status={props.proposal.status} />
          </Grid>

          <Grid item xs={6}>
            <PopupSubLabel>Type</PopupSubLabel>
            <PopupMessage>
              {props.proposal.content["@type"].split(".").pop()}
            </PopupMessage>
          </Grid>
          <Grid item xs={6}>
            <PopupSubLabel>Submit Time</PopupSubLabel>
            <PopupMessage>
              {moment(props.proposal.submit_time)
                .utc()
                .format("YYYY-MM-DD HH:mm")}{" "}
              UTC
            </PopupMessage>
          </Grid>
          <Grid item xs={6}>
            <PopupSubLabel>Deposit end</PopupSubLabel>
            <PopupMessage>
              {moment(props.proposal.deposit_end_time)
                .utc()
                .format("YYYY-MM-DD HH:mm")}{" "}
              UTC
            </PopupMessage>
          </Grid>
          {props.proposal.status !==
            ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD && (
            <>
              <Grid item xs={6}>
                <PopupSubLabel>Voting start</PopupSubLabel>
                <PopupMessage>
                  {moment(props.proposal.voting_start_time)
                    .utc()
                    .format("YYYY-MM-DD HH:mm")}{" "}
                  UTC
                </PopupMessage>
              </Grid>
              <Grid item xs={6}>
                <PopupSubLabel>Voting end</PopupSubLabel>
                <PopupMessage>
                  {moment(props.proposal.voting_end_time)
                    .utc()
                    .format("YYYY-MM-DD HH:mm")}{" "}
                  UTC
                </PopupMessage>
              </Grid>
            </>
          )}
        </GridWrap>
        {props.proposal.status ===
        ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ? (
          <VoteResult sx={{ justifyContent: "flex-end" }}>
            <Button onClick={props.onDeposit} sx={{ pl: 4.5, pr: 4.5 }}>
              Deposit
            </Button>
          </VoteResult>
        ) : (
          <VoteResult>
            {deviceType === "mobile" ? renderTotalVoted : null}
            <PieChart width={110} height={110}>
              <Pie
                data={Object.keys(tally)
                  .sort((a, b) => parseInt(tally[b]) - parseInt(tally[a]))
                  .map(key => ({
                    name: VoteOptionLabel[
                      VoteOption[key as keyof typeof VoteOption]
                    ],
                    value: getVotePerc(tally, key as keyof typeof VoteOption),
                    fill: voteOptionColor[key as keyof typeof VoteOption]
                  }))}
                cx={"50%"}
                cy={"50%"}
                innerRadius={40}
                outerRadius={55}
                dataKey="value"
              />
            </PieChart>
            <Box sx={{ flex: 1 }}>
              {deviceType !== "mobile" ? renderTotalVoted : null}
              <Options>
                {Object.keys(tally)
                  .sort((a, b) => parseInt(tally[b]) - parseInt(tally[a]))
                  .map(key => {
                    return (
                      <MostVoted
                        key={key}
                        color={voteOptionColor[key as keyof typeof VoteOption]}
                      >
                        {
                          VoteOptionLabel[
                            VoteOption[key as keyof typeof VoteOption]
                          ]
                        }
                      </MostVoted>
                    );
                  })}
              </Options>
            </Box>
            {deviceType !== "mobile" ? (
              <Button onClick={props.onProposal} sx={{ pl: 4.5, pr: 4.5 }}>
                Proposal
              </Button>
            ) : null}
          </VoteResult>
        )}
        <PopupFooter>
          <PopupLabel>Description</PopupLabel>
          <PopupMessage>
            {props.proposal.content.description
              .replaceAll("\\n", "\n")
              .split("\n")
              .map((x, i) => {
                return (
                  <span key={i.toString()}>
                    {x.split(" ").map((z, y) => {
                      return (
                        <span key={i + "" + y}>
                          {z.startsWith("http") ? (
                            <a target={"_blank"} href={z} rel="noreferrer">
                              {z}
                            </a>
                          ) : (
                            z
                          )}{" "}
                        </span>
                      );
                    })}
                    <br />
                  </span>
                );
              })}
          </PopupMessage>
        </PopupFooter>
      </Popup>
    </>
  );
}

const Title = styled("span")`
  display: block;
  margin: 30px 40px 0px 40px;
  color: #515f7f;
  font-family: Heebo-Bold;
  font-size: 20px;
  .id {
    font-family: Heebo-Bold;
    color: #515f7f;
    font-size: 24px;
  }
`;
const Options = styled("div")`
  margin-left: 20px;
  margin-top: 8px;
  display: flex;
  & div {
    margin-right: 20px;
  }
  @media (max-width: ${deviceSize.laptopMin}) {
    flex-direction: column;
  }
`;

const Total = styled("span")`
  color: #515f7f;
  font-size: 18px;
  margin-left: 20px;
  & span {
    color: #7d77ff;
    font-family: "Heebo-Medium";
  }
  @media (max-width: ${deviceSize.laptopMin}) {
    min-width: 100%;
    margin-bottom: 20px;
  }
`;

const VoteResult = styled("div")`
  padding: 30px 40px;
  margin-top: 50px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const PopupFooter = styled("div")`
  padding: 50px 80px 50px 40px;
`;

const GridWrap = styled(Grid)`
  .MuiGrid-item {
    margin-left: 40px;
    margin-top: 30px;
    max-width: calc((100% - 120px) / 2);
    @media (max-width: ${deviceSize.laptopMin}) {
      max-width: calc(100% - 40px);
    }
  }
`;
