import { ButtonBase, Link, Grid, Typography, Box, Theme } from "@mui/material";
import { positions, styled } from "@mui/system";
import useDeviceType from "../../hooks/useDeviceType";
import AppLayout from "../../layouts/app";
import InterSection from "../../components/intersection";
import Roadmap from "./Roadmap";
import Introduce from "./Introduce";
import deviceSize from "../../constants/deviceSize";

export default function Main() {
  const deviceType = useDeviceType();

  return (
    <AppLayout
      background={
        <Background
          background={deviceType === "mobile" ? "main-bg-m.jpg" : "main-bg.jpg"}
        />
      }
    >
      <Section i={0}>
        <Box sx={{ zIndex: 2 }}>
          <SubLabel zIndex={2} variant="subtitle2">
            WELCOME TO GALAXY
          </SubLabel>
          <Label zIndex={2} variant="h2">
            Create the universe
            <br />
            with us
          </Label>
        </Box>
        <Box />
        <Tiger src="/assets/images/tiger.png" alt="tiger" />
      </Section>

      <Section noDesktop={deviceType !== "desktop"} i={1}>
        <Grid container sx={{ position: "relative" }}>
          <CNBackground alt="bg2" src="/assets/images/banner2-bg.png" />
          <Grid item xs={12}>
            <InterSection>
              <Label variant="h2" textAlign="right">
                Make
                <br />
                The Cosmos Network
                <br />
                More Valuable
              </Label>
            </InterSection>
          </Grid>
          <Grid container>
            {deviceType !== "mobile" && (
              <Grid
                item
                xs={7}
                sx={{
                  mt: 3
                }}
              >
                <InterSection>
                  <img
                    width="100%"
                    alt="mobius"
                    src="/assets/images/mobius.png"
                  />
                </InterSection>
              </Grid>
            )}

            <Grid
              item
              xs={deviceType !== "mobile" ? 5 : 12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
              }}
            >
              <Grid item xs={12}>
                <InterSection>
                  <Text variant="body1" textAlign="right">
                    {deviceType === "mobile" ? (
                      <>
                        The collective intelligence of members <br />
                        in the smart and creative Cosmos <br />
                        community gathers to create a network <br />
                        of immersive world views. <br />
                        Participate in an infinitely expandable <br />
                        Metaverse and own NFT.
                      </>
                    ) : (
                      <>
                        The collective intelligence of members in the smart{" "}
                        <br />
                        and creative Cosmos community gathers <br />
                        to create a network of immersive world views. <br />
                        Participate in an infinitely expandable Metaverse <br />
                        and own NFT.
                      </>
                    )}
                  </Text>
                </InterSection>
              </Grid>

              <InterSection>
                <Link href="https://cosmos.network">
                  <CosmosButton>
                    Galaxy universe
                    <img alt="more" src="/assets/images/ic-more.png" />
                  </CosmosButton>
                </Link>
              </InterSection>
            </Grid>
          </Grid>

          {deviceType === "mobile" && (
            <InterSection
              sx={{
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                mt: 5.5
              }}
            >
              <img width="100%" alt="mobius" src="/assets/images/mobius.png" />
            </InterSection>
          )}
        </Grid>
      </Section>
      <Section i={2}>
        <Roadmap />
      </Section>
      <Section i={3} noDesktop={deviceType !== "desktop"}>
        <Introduce />
      </Section>
    </AppLayout>
  );
}

interface SectionProps {
  noDesktop?: boolean;
  i: number;
}

const Section = styled("section")`
  max-width: ${(p: SectionProps) => (p.i === 2 ? "auto" : "1200px")};
  flex-direction: ${(p: SectionProps) => (p.i <= 1 ? "column" : "row")};
  align-items: ${(p: SectionProps) =>
    p.i === 0
      ? "start"
      : p.i === 1
      ? "flex-end"
      : p.i === 3
      ? "stretch"
      : "center"};

  justify-content: ${(p: SectionProps) => (p.i <= 1 ? "center" : "start")};
  min-height: 100vh;
  width: 100%;
  display: flex;
  margin: auto;
  flex-wrap: wrap;
  @media (max-width: ${deviceSize.desktopMin}) {
    padding: 0px 20px;
  }
  @media (max-width: ${deviceSize.tabletMin}) {
    padding: 0px 17px;
    align-items: ${(p: SectionProps) => (p.i === 0 ? "center" : "")};
    justify-content: ${(p: SectionProps) => (p.i === 0 ? "space-around" : "")};
    text-align: ${(p: SectionProps) => (p.i === 0 ? "center" : "")};
  }
`;

const Tiger = styled("img")`
  position: absolute;
  max-height: 100vh;
  right: 0px;
  width: 100%;
  max-width: 1920px;
  object-fit: contain;
  margin-right: -10%;
  @media (max-width: ${deviceSize.tabletMin}) {
    position: absolute;
    left: 0px;
    margin-top: 10%;
    transform: scale(1.5);
  }
`;

const CNBackground = styled("img")`
  position: absolute;
  width: 100%;
  height: 100%;
  @media (max-width: ${deviceSize.tabletMin}) {
    width: 150%;
    height: 90%;
    margin-left: -25%;
  }
`;

const Background = styled("div")(
  ({ background }: { background: string }) =>
    `
      background-image: url(/assets/images/${background});
  
      background-size:  cover;
  background-repeat: no-repeat;
`
);
const Label = styled(Typography)`
  font-family: Heebo-Bold;
  color: #fff;
  letter-spacing: 0.7px;
  @media (max-width: ${deviceSize.tabletMin}) {
    font-size: 33px;
  }
`;

const SubLabel = styled(Typography)`
  font-family: Heebo-Medium;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.96px;
  margin-bottom: 25px;
  display: none;
  @media (max-width: ${deviceSize.tabletMin}) {
    display: block;
  }
`;

const Text = styled(Typography)`
  font-size: 20px;
  line-height: 33px;
  color: #ffffff;
  margin-top: 60px;
  letter-spacing: 0.5px;
  font-family: Heebo-Light;
  @media (max-width: ${deviceSize.tabletMin}) {
    font-size: 16px;
    margin-top: 34px;
  }
`;

const CosmosButton = styled(ButtonBase)`
  border-radius: 8px;
  border: 1px solid #fff;
  padding: 28px 36px;
  line-height: 15px;
  text-align: center;
  margin-top: 70px;
  font-size: 20px;
  font-family: Heebo-Medium;
  color: #fff;
  & img {
    margin-left: 16px;
    width: 20px;
    height: 20px;
  }
  @media (max-width: ${deviceSize.tabletMin}) {
    padding: 19px 50px;
  }
`;
