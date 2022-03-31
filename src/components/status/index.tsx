import { styled } from "@mui/system";

export default function Status() {
  return (
    <Container>
      <img alt="check" src="/assets/images/checked.svg" />
      PASSED
    </Container>
  );
}

const Container = styled("span")`
  align-self: flex-start;
  border-radius: 11px;
  width: auto;
  background-color: #7d77ff;
  color: #ffffff;
  font-size: 12px;
  font-family: Heebo-Regular;
  padding: 5px 13px 7px 8px;
  & img {
    margin-right: 4px;
    width: 10px;
    height: 10px;
    object-fit: contain;
  }
`;
