import * as React from "react";
import { Box, Grid, styled, Typography } from "@mui/material";
import InterSection from "../../components/intersection";
import BigBang from "../../components/animations/BigBang";
import useInterSection from "../../hooks/useInterSection";
import useDeviceType from "../../hooks/useDeviceType";
import deviceSize from "../../constants/deviceSize";

interface Props {
  t1: string | React.ReactNode;
  t2: string | React.ReactNode;
  t3: string | React.ReactNode;
  p: boolean;
  src: string;
}
function IntroduceItem(props: Props) {
  const deviceType = useDeviceType();
  return (
    <StyledGrid item xs={deviceType === "mobile" ? 12 : 6}>
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
            margin:
              deviceType === "mobile"
                ? "10px 0px 20px 0px"
                : "10px 0px 40px 0px"
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
        <Icon alt="tooltio" src={props.src} />
      </InterSection>
    </StyledGrid>
  );
}

export default function Introduce() {
  const deviceType = useDeviceType();
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useInterSection(ref);

  return (
    <Box
      sx={{
        flex: 1,
        alignItems: "center",
        display: "flex",
        position: "relative",
        justifyContent: "center"
      }}
    >
      <BigBang />
      <Grid
        ref={ref}
        sx={{ zIndex: 2, position: "relative" }}
        spacing={3}
        justifyContent={"center"}
        container
      >
        <Grid item xs={deviceType === "mobile" ? 12 : 6}>
          <InterSection parent={isVisible} td="1s">
            <Title variant="h2">
              We are at the <br />
              Beginning of a <br />
              New universe
            </Title>
          </InterSection>
        </Grid>
        <IntroduceItem
          src="/assets/images/main-intro1.png"
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
          src="/assets/images/main-intro3.png"
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
          src="/assets/images/main-intro2.png"
          p={isVisible}
          t1={"Governance"}
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
    </Box>
  );
}

const Icon = styled("img")`
  width: 44px;
  top: 22px;
  height: 44px;
  right: 22px;
  object-fit: contain;
  position: absolute;
`;

const Title = styled(Typography)`
  font-family: Heebo-ExtraBold;
  color: #fff;
  @media (max-width: ${deviceSize.tabletMin}) {
    font-size: 33px;
    margin-top: 80px;
  }
`;

const StyledGrid = styled(Grid)`
  z-index: 2;
  @media (max-width: ${deviceSize.tabletMin}) {
    :last-child {
      margin-bottom: 80px;
    }
  }
  & div {
    position: relative;
    padding: 60px;
    border-radius: 30px;
    background-color: rgba(11, 7, 44, 0.7);
    display: flex;
    flex-direction: column;
    @media (max-width: ${deviceSize.tabletMin}) {
      border-radius: 10px;
      padding: 30px 25px;
    }
  }
`;
