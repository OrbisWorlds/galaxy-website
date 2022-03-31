import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import Button from "../../components/button";
import Donut from "../../components/charts/donut";
import { Popup, PopupLabel, PopupMessage } from "../../components/popup";
import { Vote, VoteOption } from "../../interfaces/galaxy/vote";

interface Props extends Vote {
  onClose: () => void;
}

export default function VotePopup(props: Props) {
  const [vote, setVote] = React.useState<VoteOption>();

  const handleVoteConfirm = () => {
    props.onClose();
  };

  return (
    <Popup maxWidth="1" onClose={props.onClose}>
      <Content className="column">
        <PopupLabel>Your Vote</PopupLabel>
        <PopupMessage>
          #126 Signaling proposal LUMEE incentivized pools (UMEE/UST and
          ATOM/UMEE pairs)
        </PopupMessage>

        <FormControl sx={{ mt: 3 }}>
          <RadioGroup
            value={vote}
            onChange={e => {
              setVote(e.target.value as VoteOption);
            }}
            defaultValue="female"
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
              value={VoteOption.noWithVeto}
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

        <Button onClick={handleVoteConfirm} sx={{ alignSelf: "flex-end" }}>
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
