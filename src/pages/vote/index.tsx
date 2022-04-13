import React from "react";
import AppLayout from "../../layouts/app";
import devicesize from "../../constants/deviceSize";
import Tabs from "../../components/tabs";
import styled from "@emotion/styled";
import VoteDetailPopup from "./voteDetailPopup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchParamsDeposit, fetchProposals } from "../../store/gov";
import VoteItem from "../../components/votes/voteItem";
import { Proposal, ProposalStatus } from "../../interfaces/galaxy/gov";
import DepositPopup from "./depositPopup";
import { connectWallet } from "../../store/wallet";

export default function Vote() {
  const dispatch = useAppDispatch();
  const gov = useAppSelector(s => s.gov);
  const proposal = gov.proposal;
  const params = gov.params;

  const [tabIndex, setTabIndex] = React.useState(0);
  const [detailVote, setDetailVote] = React.useState<Proposal>();
  const [depositProposal, setDepositProposal] = React.useState<Proposal>();

  React.useEffect(() => {
    window.onload = () => {
      dispatch(connectWallet());
    };
    dispatch(connectWallet());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchProposals());
    dispatch(fetchParamsDeposit());
  }, [tabIndex, dispatch]);

  const handleVoteDetail = (data: Proposal) => {
    setDetailVote({ ...data });
  };

  const getProposalStatusByTabIndex = (): ProposalStatus => {
    switch (tabIndex) {
      case 0:
        return ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD;
      case 1:
        return ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD;
      case 2:
        return ProposalStatus.PROPOSAL_STATUS_PASSED;
      case 3:
        return ProposalStatus.PROPOSAL_STATUS_REJECTED;
      default:
        return ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED;
    }
  };

  const handleDeposit = (proposal: Proposal) => {
    setDepositProposal(proposal);
  };

  return (
    <AppLayout wallet background={<Background />}>
      {detailVote && (
        <VoteDetailPopup onClose={() => setDetailVote(undefined)} />
      )}

      {depositProposal && (
        <DepositPopup
          proposal={depositProposal}
          onClose={() => setDepositProposal(undefined)}
        />
      )}

      <Container>
        <Content>
          <Tabs
            index={tabIndex}
            onIndexChange={setTabIndex}
            titles={["ACTIVE", "DEPOSIT", "PASSED", "REJECT"]}
          />

          <VoteCards>
            {proposal.proposals.map((x, i) => {
              const status = getProposalStatusByTabIndex();
              if (x.status !== status) {
                return null;
              }
              return (
                <VoteItem
                  minDeposit={params.deposit_params.min_deposit}
                  status={status}
                  key={i.toString()}
                  proposal={x}
                  onDeposit={handleDeposit}
                />
              );
            })}
          </VoteCards>
        </Content>
      </Container>
    </AppLayout>
  );
}

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
