import { InputBase } from "@mui/material";
import { styled } from "@mui/system";

export default function SearchInput() {
  return (
    <Container>
      <Input placeholder="Search Validators" />
      <img alt="serach" src="/assets/images/search.svg" />
    </Container>
  );
}

const Input = styled(InputBase)`
  font-size: 14px;
  line-height: 14px;
  padding: 12px 20px;
  flex: 1;
`;

const Container = styled("div")`
  border-radius: 4px;
  border: 1px solid #7d77ff;
  display: flex;
  align-items: center;
  & img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    margin-right: 20px;
  }
`;
