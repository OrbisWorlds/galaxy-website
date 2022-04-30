import React, { useRef } from "react";
import AppLayout from "../../layouts/app";
import devicesize from "../../constants/deviceSize";
import Tabs from "../../components/tabs";
import styled from "@emotion/styled";
import DetailPopup from "./detailPopup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchParamsDeposit, fetchProposals } from "../../store/gov";
import ProposalItem from "../../components/gov/proposalItem";
import { Proposal, ProposalStatus } from "../../interfaces/galaxy/gov";
import DepositPopup from "./depositPopup";
import { connectWallet } from "../../store/wallet";
import VotePopup from "./votePopup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useDeviceType from "../../hooks/useDeviceType";

export default function Vote() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const gov = useAppSelector(s => s.gov);
  const proposal = gov.proposal;
  const params = gov.params;

  const [tabIndex, setTabIndex] = React.useState(0);
  const [detailProposal, setDetailProposal] = React.useState<Proposal>();
  const [depositProposal, setDepositProposal] = React.useState<Proposal>();
  const [voteProposal, setVoteProposal] = React.useState<Proposal>();

  let initialPopupOpened = useRef(false);

  React.useEffect(() => {
    if (
      id &&
      proposal &&
      proposal.proposals.length >= 1 &&
      !initialPopupOpened.current
    ) {
      initialPopupOpened.current = true;
      setDetailProposal(
        proposal.proposals.filter(x => x.proposal_id === id)[0] || undefined
      );
    }
  }, [id, proposal]);

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

  const getProposalStatusByTabIndex = React.useCallback((): ProposalStatus => {
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
  }, [tabIndex]);

  React.useEffect(() => {
    if (
      getProposalStatusByTabIndex() ===
        ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD &&
      !depositProposal &&
      detailProposal &&
      !proposal.proposals.filter(
        x =>
          x.proposal_id === detailProposal.proposal_id &&
          x.status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD
      ).length
    ) {
      setDetailProposal(undefined);
    }
  }, [
    tabIndex,
    proposal.proposals,
    depositProposal,
    detailProposal,
    getProposalStatusByTabIndex
  ]);

  const handleDeposit = (proposal: Proposal) => {
    setDepositProposal(proposal);
  };

  return (
    <AppLayout wallet background={<Background />}>
      {detailProposal && (
        <DetailPopup
          onProposal={() => setVoteProposal(detailProposal)}
          proposal={detailProposal}
          onDeposit={() => setDepositProposal(detailProposal)}
          onClose={() => setDetailProposal(undefined)}
        />
      )}
      {depositProposal && (
        <DepositPopup
          proposal={depositProposal}
          onClose={() => setDepositProposal(undefined)}
        />
      )}
      {voteProposal && (
        <VotePopup
          onClose={() => setVoteProposal(undefined)}
          proposal={voteProposal}
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
                <ProposalItem
                  minDeposit={params.deposit_params.min_deposit}
                  status={status}
                  key={i.toString()}
                  proposal={x}
                  onDeposit={handleDeposit}
                  onDetail={p => {
                    setDetailProposal(p);
                  }}
                  onVote={p => {
                    setVoteProposal(p);
                  }}
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
  background-image: url(/public/assets/images/airdrop-claim-bg.jpg);
  background-size: cover;
`;
