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

export default function Vote() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [detailVote, setDetailVote] = React.useState<VoteI>();
  const [votes, setVotes] = React.useState([1, 2, 3, 4, 5]);

  React.useEffect(() => {
    setVotes([]);
  }, [tabIndex]);

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
            <VoteCard>
              <span className="v-n">#134</span>
              <span className="v-t">
                Semi-Automatic Incentive Adjustments for 02/28/2022
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
                    2022-03-03 16:58 UTC
                  </span>
                </span>
                <div>
                  <Button buttonType="border">Detail</Button>
                  <Button>Vote</Button>
                </div>
              </div>
            </VoteCard>
            <VoteCard>
              <span className="v-n">#134</span>
              <span className="v-t">
                Semi-Automatic Incentive Adjustments for 02/28/2022
              </span>
              <VoteResult>
                <Donut
                  color={voteOptionColor[VoteOption.abstain]}
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
                  <MostVoted color={voteOptionColor[VoteOption.abstain]}>
                    {VoteOption.abstain}
                    <span>54%</span>
                  </MostVoted>
                </span>
              </VoteResult>
              <div className="v-f">
                <span className="v-t-c">
                  Voting End Time
                  <span>
                    <br />
                    2022-03-03 16:58 UTC
                  </span>
                </span>
                <div>
                  <Button buttonType="border">Detail</Button>
                  <Button>Vote</Button>
                </div>
              </div>
            </VoteCard>
            <VoteCard>
              <span className="v-n">#134</span>
              <span className="v-t">
                Semi-Automatic Incentive Adjustments for 02/28/2022
              </span>
              <VoteResult>
                <Donut
                  color={voteOptionColor[VoteOption.no]}
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
                  <MostVoted color={voteOptionColor[VoteOption.no]}>
                    {VoteOption.no}
                    <span>54%</span>
                  </MostVoted>
                </span>
              </VoteResult>
              <div className="v-f">
                <span className="v-t-c">
                  Voting End Time
                  <span>
                    <br />
                    2022-03-03 16:58 UTC
                  </span>
                </span>
                <div>
                  <Button
                    onClick={() => handleVoteDetail({})}
                    buttonType="border"
                  >
                    Detail
                  </Button>
                  <Button>Vote</Button>
                </div>
              </div>
            </VoteCard>
            <VoteCard>
              <span className="v-n">#134</span>
              <span className="v-t">
                Semi-Automatic Incentive Adjustments for 02/28/2022
              </span>
              <VoteResult>
                <Donut
                  color={voteOptionColor[VoteOption.yes]}
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
                  <MostVoted color={voteOptionColor[VoteOption.yes]}>
                    {VoteOption.abstain}
                    <span>54%</span>
                  </MostVoted>
                </span>
              </VoteResult>
              <div className="v-f">
                <span className="v-t-c">
                  Voting End Time
                  <span>
                    <br />
                    2022-03-03 16:58 UTC
                  </span>
                </span>
                <div>
                  <Button buttonType="border">Detail</Button>
                  <Button>Vote</Button>
                </div>
              </div>
            </VoteCard>
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
    font-family: Heebo-Bold;
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
