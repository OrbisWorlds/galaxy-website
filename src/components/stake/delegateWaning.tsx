import { styled } from "@mui/system";

export default function DelegateWaning() {
  return (
    <Container className="column">
      <img alt="waning" src="/public/assets/images/waning.svg" />
      <span>
        <span>Staking will lock your funds for 21+ day</span>
        You will need to undelegate in order for your staked assets to be liquid
        again. <br />
        This process will take 21 days to complete.
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
    text-align: center;
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
