import { Box, ButtonBase } from "@mui/material";
import { styled } from "@mui/system";
import { Validator } from "../../interfaces/galaxy/staking";
import ValidatorMoniker from "../validator-moniker/validatorMoniker";

interface Props {
  validators: Validator[];
  keyword?: string;
  address: string;
  onSelect: (v: Validator) => void;
}
export default function Validators(props: Props) {
  return (
    <Container>
      <Header>
        <span>Validators</span>
      </Header>
      <Box sx={{ maxHeight: 52 * 3, height: 52 * 3, overflowY: "auto" }}>
        {props.validators.map((x, i) => {
          if (
            props.keyword &&
            !x.description.moniker
              .replace(/ /g, "")
              .toLowerCase()
              .match(props.keyword)
          ) {
            return null;
          }
          return (
            <ListItem
              onClick={() => {
                props.onSelect(x);
              }}
              key={i.toString()}
              sx={{
                backgroundColor:
                  props.address === x.operator_address
                    ? "#ededed"
                    : "transparent"
              }}
            >
              <ValidatorMoniker
                dark
                operatorAddress={x.operator_address}
                moniker={x.description.moniker}
              />
            </ListItem>
          );
        })}
      </Box>
    </Container>
  );
}

const ListItem = styled(ButtonBase)`
  padding: 10px 24px;
  display: flex;
  width: 100%;
  font-size: 14px;
  color: #111111;
  font-family: "Heebo-Medium";
  align-items: center;
  text-align: left;
  justify-content: flex-start;
`;

const Header = styled("div")`
  padding: 17px 20px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  align-items: center;
  & span {
    font-family: "Heebo-Medium";
    font-size: 14px;
    color: #515f7f;
  }
`;

const Container = styled("div")`
  border-radius: 4px;
  background-color: #f7f7f7;
`;
