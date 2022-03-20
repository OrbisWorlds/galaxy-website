import * as React from "react";
import { Grid, styled, Typography } from "@mui/material";
import { Section } from ".";
import InterSection from "../../components/intersection";
import BigBang from "../../components/animations/BigBang";
import useInterSection from "../../hooks/useInterSection";

interface Props {
  t1: string | React.ReactNode;
  t2: string | React.ReactNode;
  t3: string | React.ReactNode;
  p: boolean;
}
function IntroduceItem(props: Props) {
  return (
    <StyledGrid item xs={6}>
      <InterSection height={"100%"} parent={props.p} td={"1s"}>
        <span
          style={{
            fontSize: "14px",
            color: "#a8a8a8",
            fontFamily: "Heebo-Regular"
          }}
        >
          {props.t1}
        </span>
        <span
          style={{
            fontSize: "32px",
            color: "#fff",
            fontFamily: "Heebo-Bold",
            lineHeight: "36px",
            margin: "10px 0px 40px 0px"
          }}
        >
          {props.t2}
        </span>
        <span
          style={{
            fontSize: "17px",
            color: "#d1d1d1",
            fontFamily: "Heebo-Light"
          }}
        >
          {props.t3}
        </span>
      </InterSection>
    </StyledGrid>
  );
}

export default function Introduce() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useInterSection(ref);

  return (
    <Grid
      ref={ref}
      sx={{ zIndex: 2, position: "relative" }}
      spacing={3}
      container
    >
      <BigBang />
      <Grid item xs={6}>
        <InterSection parent={isVisible} td="1s">
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Heebo-ExtraBold",
              color: "#fff"
            }}
          >
            We are at the <br />
            beginning of a <br />
            new universe
          </Typography>
        </InterSection>
      </Grid>
      <IntroduceItem
        p={isVisible}
        t1={"Economy"}
        t2={
          <>
            Galaxy <br />
            Economy
          </>
        }
        t3={
          <>
            The Galaxy Economy is transparent <br />
            and fair for community <br />
            development and prosperity.
          </>
        }
      />
      <IntroduceItem
        p={isVisible}
        t1={"NFT/Metaverse"}
        t2={
          <>
            Imagine They <br />
            New Universe
          </>
        }
        t3={
          <>
            We have infinite imagination. Create novel stories <br />
            and bring vitality to the all Cosmos ecosystem. <br />
            Own the stories and characters you created as NFT. <br />
            Participate in Galaxy Metaverse with NFT.
          </>
        }
      />
      <IntroduceItem
        p={isVisible}
        t1={"Economy"}
        t2={
          <>
            Participate <br />
            In The Universe
          </>
        }
        t3={
          <>
            Stake GLX and participate in the community. <br />
            We can vote for a story created by someone and <br />
            make it an official story only through the GALAXY.
          </>
        }
      />
    </Grid>
  );
}

const StyledGrid = styled(Grid)`
  z-index: 2;
  & div {
    padding: 60px;
    min-height: 340px;
    border-radius: 30px;
    background-color: rgba(11, 7, 44, 0.7);
    display: flex;
    flex-direction: column;
  }
`;
