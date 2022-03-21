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
                alignItems: "end"
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

const Section = styledTheme("section")<{ noDesktop?: boolean; i: number }>(
  props => ({
    "max-width": props.i === 2 ? "auto" : "1200px",
    "flex-direction": props.i <= 1 ? "column" : "row",
    "align-items":
      props.i === 0
        ? "start"
        : props.i === 1
        ? "end"
        : props.i === 3
        ? "stretch"
        : "center",
    "justify-content": props.i <= 1 ? "center" : "start",
    "min-height": "100vh",
    width: "100%",
    display: "flex",
    margin: "auto",
    "flex-wrap": "wrap",
    [props.theme.breakpoints.down("lg")]: {
      padding: "0px 20px"
    },
    [props.theme.breakpoints.down("md")]: {
      padding: "0px 17px",
      ...(props.i === 0 && {
        alignItems: "center",
        "justify-content": "space-around",
        textAlign: "center"
      })
    }
  })
);

const Tiger = styledTheme("img")(p => ({
  position: "absolute",
  maxHeight: "100vh",
  right: 0,
  width: "100%",
  maxWidth: "1920px",
  objectFit: "contain",
  marginRight: "-10%",
  [p.theme.breakpoints.down("md")]: {
    position: "absolute",
    left: 0,
    marginTop: "10%",
    transform: "scale(1.5)"
  }
}));

const CNBackground = styledTheme("img")(p => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  [p.theme.breakpoints.down("md")]: {
    width: "150%",
    height: "90%",
    marginLeft: "-25%"
  }
}));

const Background = styled("div")(
  ({ background }: { background: string }) =>
    `
  background-image: url(/assets/images/${background});
  background-size:  cover;
  background-repeat: no-repeat;
`
);

const Label = styledTheme(Typography)(p => ({
  fontFamily: "Heebo-Bold",
  color: "#fff",
  letterSpacing: "0.7px",
  [p.theme.breakpoints.down("md")]: {
    fontSize: "33px"
  }
}));

const SubLabel = styledTheme(Typography)(p => ({
  fontFamily: "Heebo-Medium",
  color: "rgba(255 ,255, 255, 0.4)",
  letterSpacing: "0.96px",
  marginBottom: 25,
  display: "none",
  [p.theme.breakpoints.down("md")]: {
    display: "block"
  }
}));

const Text = styledTheme(Typography)(p => ({
  "font-size": "20px",
  "line-height": "33px",
  color: "#ffffff",
  marginTop: "60px",
  "letter-spacing": "0.5px",
  "font-family": "Heebo-Light",
  [p.theme.breakpoints.down("md")]: {
    fontSize: "16px",
    marginTop: "34px"
  }
}));

const CosmosButton = styledTheme(ButtonBase)(p => ({
  "border-radius": "8px",
  border: "1px solid #fff",
  padding: "28px 36px",
  "line-height": "15px",
  "text-align": "center",
  "margin-top": "70px",
  "font-size": "20px",
  "font-family": "Heebo-Medium",
  color: "#fff",
  "& img": {
    "margin-left": "16px",
    width: "20px",
    height: "20px"
  },
  [p.theme.breakpoints.down("md")]: {
    padding: "19px 50px"
  }
}));
