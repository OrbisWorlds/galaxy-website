import { styled } from "@mui/material";

interface Props {
  titles: string[];
  index: number;
  onIndexChange: (i: number) => void;
}

export default function Tabs(props: Props) {
  return (
    <Container>
      {props.titles.map((x, i) => {
        return (
          <Tab
            key={i.toString()}
            onClick={() => props.onIndexChange(i)}
            className={i === props.index ? "tabs-tab-on" : ""}
          >
            {x}
          </Tab>
        );
      })}
    </Container>
  );
}

const Tab = styled("span")`
  font-size: 13px;
  color: #5954cc;
  flex: 1;
  padding: 8px 20px;
  cursor: pointer;
`;

const Container = styled("div")`
  align-self: center;
  min-width: 180px;
  border-radius: 22px;
  padding: 5px;
  background-color: #1e184f;
  display: flex;
  align-items: stretch;
  .tabs-tab-on {
    background-color: #0d0c25;
    border-radius: 16px;
    color: #fff;
  }
`;
