import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import Button from "../../components/button";
import { Popup, PopupLabel, PopupMessage } from "../../components/popup";
import { Proposal, VoteOption } from "../../interfaces/galaxy/gov";
import { vote } from "../../store/gov";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface Props {
  onClose: () => void;
  proposal: Proposal;
}

export default function VotePopup(props: Props) {
  const dispatch = useAppDispatch();
  const wallet = useAppSelector(s => s.wallet);
  const [option, setOption] = React.useState<VoteOption>();

  const handleVoteConfirm = () => {
    if (!option) return;
    dispatch(
      vote({
        voter: wallet.address,
        proposal_id: props.proposal.proposal_id,
        option
      })
    )
      .unwrap()
      .then(props.onClose);
  };

  return (
    <Popup maxWidth="400px" onClose={props.onClose}>
      <Content className="column">
        <PopupLabel>Your Proposal</PopupLabel>
        <PopupMessage>
          #{props.proposal.proposal_id} {props.proposal.content.title}
        </PopupMessage>

        <FormControl sx={{ mt: 3 }}>
          <RadioGroup
            value={option}
            onChange={e => {
              setOption(e.target.value as VoteOption);
            }}
          >
            <FormControlLabel
              value={VoteOption.yes}
              control={<StyledRadio />}
              label="Yes"
            />
            <FormControlLabel
              value={VoteOption.no}
              control={<StyledRadio />}
              label="No"
            />
            <FormControlLabel
              value={VoteOption.no_with_veto}
              control={<StyledRadio />}
              label="NoWithVeto"
            />
            <FormControlLabel
              value={VoteOption.abstain}
              control={<StyledRadio />}
              label="Abstain"
            />
          </RadioGroup>
        </FormControl>

        <Button
          onClick={handleVoteConfirm}
          disabled={!option}
          sx={{ alignSelf: "flex-end" }}
        >
          Confirm
        </Button>
      </Content>
    </Popup>
  );
}

const StyledRadio = styled(Radio)`
  color: #7d77ff;
  &.Mui-checked {
    color: #7d77ff !important;
  }
`;

const Content = styled("div")`
  padding: 40px 30px;
`;
