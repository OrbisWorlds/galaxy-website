import { styled } from "@mui/system";

export default function Validators() {
  return (
    <Container>
      <Header>
        <span>Validators</span>
      </Header>
    </Container>
  );
}

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
