import { styled } from "@mui/system";
import { ProposalStatus } from "../../interfaces/galaxy/gov";

interface Props {
  status: ProposalStatus;
}

export function Status(props: Props) {
  return (
    <Container>
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
  background-color: #7d77ff;
  color: #ffffff;
  font-size: 12px;
  font-family: "Heebo-Regular";
  padding: 5px 13px 5px 8px;
  & img {
    margin-right: 4px;
    width: 10px;
    height: 10px;
    object-fit: contain;
  }
`;
