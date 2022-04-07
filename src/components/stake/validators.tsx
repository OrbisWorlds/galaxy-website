import { Box, ButtonBase } from "@mui/material";
import { styled } from "@mui/system";
import { Validator } from "../../interfaces/galaxy/staking";

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
          if (props.keyword && !x.description.moniker.match(props.keyword)) {
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
              <Icon src="/assets/images/validator.svg" alt="validator" />
              {x.description.moniker}
            </ListItem>
          );
        })}
      </Box>
    </Container>
  );
}

const Icon = styled("img")`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 20px;
`;

const ListItem = styled(ButtonBase)`
  padding: 10px 24px;
  display: flex;
  width: 100%;
  font-size: 14px;
  color: #111111;
  font-family: Heebo-Medium;
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
    font-family: Heebo-Medium;
    font-size: 14px;
    color: #515f7f;
  }
`;

const Container = styled("div")`
  border-radius: 4px;
  background-color: #f7f7f7;
`;
