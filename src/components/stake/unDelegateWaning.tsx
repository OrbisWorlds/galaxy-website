import { styled } from "@mui/system";

export default function UnDelegateWaning() {
  return (
    <Container className="column">
      <img alt="waning" src="/public/assets/images/waning.svg" />
      <span>
        <span>Once the unbonding period begins you will : </span>
        - not receive staking rewards
        <br />
        - not be able to cancel the unbonding
        <br />
        - need to wait 21 days for the amount to be liquid.
        <br />
      </span>
    </Container>
  );
}

const Container = styled("div")`
  border: 1px solid #ffaea9;
  background-color: #fff7f6;
  border-radius: 4px;
  padding: 24px;
  & img {
    margin: auto;
    width: 37px;
    height: 32px;
  }
  & span {
    margin: auto;
    font-size: 15px;
    color: #fc766d;
    line-height: 23px;
    & span {
      margin-top: 16px;
      display: block;
      color: #f25d53;
      font-family: "Heebo-Bold";
      font-size: 16px;
    }
  }
`;
