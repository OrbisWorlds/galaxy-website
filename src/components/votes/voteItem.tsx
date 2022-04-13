import React from "react";
import devicesize from "../../constants/deviceSize";
import Button from "../../components/button";
import { VoteOption } from "../../interfaces/galaxy/vote";
import { voteOptionColor } from "../../constants/colors";
import Donut from "../../components/charts/donut";
import styled from "@emotion/styled";
import { MostVoted } from "../../components/votes";
import moment from "moment";
import { Proposal, ProposalStatus } from "../../interfaces/galaxy/gov";
import { parseOriginCoinAmount } from "../../utils";
import { Coin } from "../../interfaces/galaxy";

interface Props {
  proposal: Proposal;
  status: ProposalStatus;
  minDeposit?: Coin[];
  onDeposit?: (proposal: Proposal) => void;
}

export default function VoteItem(props: Props) {
  return (
    <VoteCard>
      <span className="v-n">
        #{props.proposal.proposal_id}
        <span>
          {moment(
            props.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
              ? props.proposal.voting_start_time
              : props.proposal.submit_time
          ).format("MM/DD/YYYY")}
        </span>
      </span>
      <span className="v-t">{props.proposal.content.title} </span>
      <VoteResult>
        {props.status !== ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ? (
          <>
            <Donut
              color={voteOptionColor[VoteOption.noWithVeto]}
              size={90}
              perc={50}
            />
            <span className="v-t-c">
              Turn out
              <span>
                <br />
                54.04%
              </span>
            </span>
            <div className="v-t-c-l" />
            <span className="v-t-c">
              Most voted
              <br />
              <MostVoted color={voteOptionColor[VoteOption.noWithVeto]}>
                {VoteOption.noWithVeto}
                <span>54%</span>
              </MostVoted>
            </span>
          </>
        ) : (
          <DepositContent>
            <span className="v-t-c">
              Deposit End Time
              <span>
                <br />
                {moment(props.proposal.deposit_end_time)
                  .utc()
                  .format("YYYY-MM-DD HH:mm") + " UTC"}
              </span>
            </span>

            <span className="v-t-c">
              Total Deposit
              <span>
                <br />
                {parseOriginCoinAmount(
                  props.proposal.total_deposit.reduce(
                    (a, b) => a + parseInt(b.amount),
                    0
                  )
                ) + " GLX"}
              </span>
            </span>

            <span className="v-t-c">
              Min Deposit
              <span>
                <br />
                {(props.minDeposit
                  ? parseOriginCoinAmount(
                      props.minDeposit.reduce(
                        (a, b) => a + parseInt(b.amount),
                        0
                      )
                    )
                  : "0") + " GLX"}
              </span>
            </span>
          </DepositContent>
        )}
      </VoteResult>
      <div className="v-f">
        {props.status !== ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ? (
          <span className="v-t-c">
            Voting End Time
            <span>
              <br />
              {moment(props.proposal.voting_end_time)
                .utc()
                .format("YYYY-MM-DD HH:mm") + " UTC"}
            </span>
          </span>
        ) : (
          <span />
        )}
        <div>
          <Button shadowDisabled buttonType="border">
            Detail
          </Button>
          {props.status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ? (
            <Button
              onClick={() => {
                if (props.onDeposit) props.onDeposit(props.proposal);
              }}
              shadowDisabled
            >
              Deposit
            </Button>
          ) : (
            <Button shadowDisabled>Vote</Button>
          )}
        </div>
      </div>
    </VoteCard>
  );
}

const DepositContent = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const VoteResult = styled("div")`
  display: flex;
  align-items: center;
  margin: 30px 40px 0px 40px;
  .v-t-c-l {
    width: 1px;
    height: 90%;
    margin: 0px 20px;
    background-color: #19134f;
  }
`;

const VoteCard = styled.div`
  background-color: #0d0c25;
  border: 1px solid #5954cc;
  border-radius: 8px;
  width: calc(calc(100% - 30px) / 2);
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  & svg {
    margin-right: 28px;
  }
  .v-t-c {
    color: #848484;
    line-height: 26px;
    font-size: 14px;
    & span {
      color: #fff;
      font-size: 15px;
    }
  }
  .v-n {
    display: inline-block;
    font-size: 22px;
    color: #fff;
    font-family: "Heebo-Bold";
    margin: 40px;
    display: flex;
    align-self: stretch;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    & span {
      font-size: 14px;
      color: #5954cc;
    }
  }
  .v-t {
    font-size: 16px;
    color: #fff;
    margin: 0px 40px;
  }
  .v-f {
    & button {
      :first-of-type {
        margin-right: 10px;
      }
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    border-top: 1px solid #19134f;
    padding: 24px 40px;
  }
  @media (max-width: ${devicesize.laptopMin}) {
    width: auto;
  }
`;
