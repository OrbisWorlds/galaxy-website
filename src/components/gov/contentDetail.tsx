import { styled } from "@mui/system";

interface Props {
  data: { label: string; value: string }[] | undefined;
}
export default function ContentDetail(props: Props) {
  return (
    <Container>
      {props.data?.map((x, i) => {
        return (
          <Row key={i.toString()}>
            <span className="label">{x.label}</span>
            <span className="value">{x.value}</span>
          </Row>
        );
      })}
    </Container>
  );
}

const Row = styled("div")`
  display: flex;
  border-bottom: 1px solid #eeeeee;
  :first-of-type {
    border-top: 1px solid #eeeeee;
  }
  .label {
    flex: 1;
    font-size: 13px;
    background-color: #f7f7f7;
    padding: 8.5px 12px;
    font-family: Heebo-Medium;
    color: #515f7f;
  }
  .value {
    flex: 1;
    font-size: 13px;
    color: #999999;
    padding: 7px 14px;
  }
`;

const Container = styled("div")`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
