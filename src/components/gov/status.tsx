import { styled } from "@mui/system";
import { ProposalStatus } from "../../interfaces/galaxy/gov";

interface Props {
  status: ProposalStatus;
}

export function Status(props: Props) {
  return (
    <Container status={props.status}>
      <img alt="check" src="/public/assets/images/checked.svg" />
      {props.status === ProposalStatus.PROPOSAL_STATUS_PASSED && "PASSED"}
      {props.status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD &&
        "DEPOSIT"}
      {props.status === ProposalStatus.PROPOSAL_STATUS_REJECTED && "REJECTED"}
      {props.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD &&
        "ACTIVE"}
    </Container>
  );
}

const Container = styled("span")`
  border-radius: 15px;
  display: inline-block;
  align-self: flex-start;
  margin-top: 5px;
  width: auto;
  background-color: ${(props: Props) =>
    props.status === ProposalStatus.PROPOSAL_STATUS_PASSED
      ? "#7d77ff"
      : props.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
      ? "#73c86c"
      : props.status === ProposalStatus.PROPOSAL_STATUS_REJECTED
      ? "#fd8176"
      : "#efc66e"};
  color: #ffffff;
  font-size: 12px;
  font-family: "Heebo-Regular";
  padding: 2px 13px 2px 8px;
  & img {
    margin-right: 4px;
    width: 10px;
    height: 10px;
    object-fit: contain;
  }
`;
