import { styled } from "@mui/system";

export default function ValidatorPopupHeader() {
  return (
    <Container>
      <Icon alt="validator" src="/assets/images/validator.svg" />
      <div>
        <Moniker>GALAXY</Moniker>
        <br />
        <Comission>Comission - 5%</Comission>
      </div>
    </Container>
  );
}

const Comission = styled("span")`
  font-size: 14px;
  color: #999999;
`;

const Moniker = styled("span")`
  font-size: 20px;
  color: #2a267b;
  font-family: Heebo-Medium;
`;

const Icon = styled("img")`
  width: 68px;
  height: 68px;
  margin-right: 20px;
  border-radius: 100%;
  object-fit: cover;
`;

const Container = styled("div")`
  background-color: #f7f7f7;
  padding: 24px 30px;
  display: flex;
  align-items: center;
`;
