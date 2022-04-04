import React from "react";
import { styled } from "@mui/system";
import Button from "../../components/button";
import { Popup } from "../../components/popup";
import { ValidatorPopupHeader, UnDelegateWaning } from "../../components/stake";
import { TokenAmountLabel } from "../../components/label";
import TokenInput from "../../components/input/tokenInput";
import SearchInput from "../../components/input/searchInput";
import Validators from "../../components/stake/validators";

interface Props {
  onClose: () => void;
}

export default function ReDelegatePopup(props: Props) {
  const handleDelegate = () => {
    props.onClose();
  };

  return (
    <Popup maxWidth="500px" onClose={props.onClose}>
      <ValidatorPopupHeader />
      <Content className="column">
        <SearchInput />

        <ValidatorsWrap>
          <Validators />
        </ValidatorsWrap>

        <TokenInput sx={{ mt: 2 }} />
        <Button onClick={handleDelegate} sx={{ alignSelf: "flex-end", mt: 3 }}>
          ReDelegate
        </Button>
      </Content>
    </Popup>
  );
}

const ValidatorsWrap = styled("div")`
  margin-top: 10px;
`;

const Content = styled("div")`
  padding: 30px 24px;
`;
