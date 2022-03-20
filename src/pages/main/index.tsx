import { ButtonBase, Link, Grid, Typography, Box, Theme } from "@mui/material";
import { styled } from "@mui/system";
import useDeviceType from "../../hooks/useDeviceType";
import AppLayout from "../../layouts/app";
import InterSection from "../../components/intersection";
import Roadmap from "./Roadmap";
import Introduce from "./Introduce";
import styledTheme from "../../store/styled";

export default function Main() {
  const deviceType = useDeviceType();

  return (
    <AppLayout>
      <Background
        id="fullpage"
        background={deviceType === "mobile" ? "main-bg-m.jpg" : "main-bg.jpg"}
      >
        <Section i={0}>
          <MainBanner>
            <Label zIndex={2} variant="h2">
              Create the universe
              <br />
              with us
            </Label>
          </MainBanner>

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
              {deviceType === "desktop" && (
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
                xs={deviceType !== "desktop" ? 12 : 5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end"
                }}
              >
                <Grid item xs={12}>
                  <InterSection>
                    <Text variant="body1" textAlign="right" marginTop={"60px"}>
                      The collective intelligence of members in the smart <br />
                      and creative Cosmos community gathers <br />
                      to create a network of immersive world views. <br />
                      Participate in an infinitely expandable Metaverse <br />
                      and own NFT.
                    </Text>
                  </InterSection>
                </Grid>

                <InterSection>
                  <Link href="https://cosmos.network">
                    <CosmosButton>
                      Cosmos universe
                      <img alt="more" src="/assets/images/ic-more.png" />
                    </CosmosButton>
                  </Link>
                </InterSection>
              </Grid>
            </Grid>

            {deviceType !== "desktop" && (
              <InterSection
                sx={{
                  width: "60%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  mt: 11
                }}
              >
                <img
                  width="100%"
                  alt="mobius"
                  src="/assets/images/mobius.png"
                />
              </InterSection>
            )}
          </Grid>
        </Section>
        <Section i={2}>
          <Roadmap />
        </Section>
        <Section noDesktop={deviceType !== "desktop"}>
          <Box sx={{ pb: 20 }}>
            <Introduce />
          </Box>
        </Section>
      </Background>
    </AppLayout>
  );
}

const MainBanner = styledTheme("div")(p => ({
  maxWidth: 1920,
  display: "flex",
  zIndex: 2,
  margin: "auto",
  flex: 1,
  [p.theme.breakpoints.down("lg")]: {
    margin: "20% 0px 0px 0px",
    textAlign: "center",
    justifyContent: "center"
  }
}));
const Tiger = styledTheme("img")(p => ({
  position: "absolute",
  maxHeight: "100vh",
  right: 0,
  width: "100%",
  maxWidth: "1920px",
  objectFit: "contain",
  [p.theme.breakpoints.down("lg")]: {
    position: "relative"
  }
}));

const CNBackground = styled("img")`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const CosmosButton = styled(ButtonBase)`
  border: 1px solid #fff;
  border-radius: 8px;
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
`;

const Section = styledTheme("section")<{ noDesktop?: boolean; i?: number }>(
  props => ({
    "min-height": "100vh",
    width: "100%",
    "max-width": props.i === 2 ? "auto" : "1200px",
    display: "flex",
    "flex-direction": props.i === 1 ? "column" : "row",
    margin: "auto",
    "flex-wrap": "wrap",
    "align-items": props.i === 1 ? "end" : props.i === 0 ? "start" : "center",
    "justify-content": props.i === 1 ? "center" : "start",
    padding: props.noDesktop ? "0px 40px" : "0px"
  })
);

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
`;

const Text = styled(Typography)`
  font-size: 20px;
  line-height: 33px;
  color: #ffffff;
  letter-spacing: 0.5px;
  font-family: Heebo-Light;
`;
