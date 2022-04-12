import React from "react";
import AppLayout from "../../layouts/app";
import devicesize from "../../constants/deviceSize";
import Tabs from "../../components/tabs";
import Button from "../../components/button";
import { Vote as VoteI, VoteOption } from "../../interfaces/galaxy/vote";
import { voteOptionColor } from "../../constants/colors";
import Donut from "../../components/charts/donut";
import styled from "@emotion/styled";
import VoteDetailPopup from "./voteDetailPopup";
import { MostVoted } from "../../components/votes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import moment from "moment";
import { fetchProposals } from "../../store/gov";

export default function Vote() {
  const dispatch = useAppDispatch();
  const proposal = useAppSelector(s => s.gov.proposal);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [detailVote, setDetailVote] = React.useState<VoteI>();
  const [votes, setVotes] = React.useState([1, 2, 3, 4, 5]);

  React.useEffect(() => {
    dispatch(fetchProposals());
  }, [tabIndex, dispatch]);

  const handleVoteDetail = (data: VoteI) => {
    setDetailVote({ ...data });
  };

  return (
    <AppLayout wallet background={<Background />}>
      {detailVote && (
        <VoteDetailPopup {...votes} onClose={() => setDetailVote(undefined)} />
      )}

      <Container>
        <Content>
          <Tabs
            index={tabIndex}
            onIndexChange={setTabIndex}
            titles={["ACTIVE", "PASSED"]}
          />

          <VoteCards>
            {proposal.proposals.map((x, i) => {
              console.log(x);
              return (
                <VoteCard key={i.toString()}>
                  <span className="v-n">#{x.proposal_id}</span>
                  <span className="v-t">
                    {x.content.title}{" "}
                    {moment(x.submit_time).format("MM/DD/YYYY")}
                  </span>
                  <VoteResult>
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
                  </VoteResult>
                  <div className="v-f">
                    <span className="v-t-c">
                      Voting End Time
                      <span>
                        <br />
                        {moment(x.voting_end_time)
                          .utc()
                          .format("YYYY-MM-DD HH:mm") + " UTC"}
                      </span>
                    </span>
                    <div>
                      <Button shadowDisabled buttonType="border">
                        Detail
                      </Button>
                      <Button shadowDisabled>Vote</Button>
                    </div>
                  </div>
                </VoteCard>
              );
            })}
          </VoteCards>
        </Content>
      </Container>
    </AppLayout>
  );
}

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
    margin-bottom: 10px;
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

const VoteCards = styled.div`
  margin-top: 30px;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  @media (max-width: ${devicesize.laptopMin}) {
    flex-direction: column;
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
  padding-top: 140px;
`;

const Background = styled("div")`
  min-height: 100vh;
  background-image: url(/assets/images/airdrop-claim-bg.jpg);
  background-size: contain;
  background-repeat: repeat;
`;
