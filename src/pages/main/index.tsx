import { ButtonBase, Link, Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import useDeviceType from "../../hooks/useDeviceType";
import AppLayout from "../../layouts/app";
import InterSection from "../../components/intersection";
import Roadmap from "./Roadmap";
import Introduce from "./Introduce";

export default function Main() {
  const deviceType = useDeviceType();

  return (
    <AppLayout>
      <Background
        id="fullpage"
        background={deviceType === "mobile" ? "main-bg-m.jpg" : "main-bg.jpg"}
      >
        <Section i={0}>
          {
            //         <Star alt="star" src="/assets/images/star.png" />
          }
          <Label zIndex={2} marginTop={"30%"} variant="h2">
            Create the universe
            <br />
            with us
          </Label>
          <Tiger alt="tiger" src="/assets/images/tiger.png" />
        </Section>

        <Section noDesktop={deviceType !== "desktop"} i={1}>
          <InterSection>
            <Label variant="h2" textAlign="right">
              Make
              <br />
              The Cosmos Network
              <br />
              More Valuable
            </Label>
          </InterSection>
          <Grid container>
            <Grid
              item
              xs={7}
              sx={{
                mt: 3,
                "& img": {
                  width: "100%"
                }
              }}
            >
              <InterSection>
                <img alt="mobius" src="/assets/images/mobius.png" />
              </InterSection>
            </Grid>
            <Grid container xs={5} justifyContent="end">
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

const Star = styled("img")`
  width: 100vw;
  top: 0;
  left: 0;
  height: 100vh;
  position: absolute;
  object-fit: contain;
`;
const Tiger = styled("img")`
  width: 100%;
  max-width: 1200px;
  top: 0;
  right: 0;
  position: absolute;
  object-fit: contain;
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

export const Section = styled("section")(
  (props: { noDesktop?: boolean; i?: number }) => `
  min-height: 100vh;
  width: 100%;
  max-width: ${props.i === 2 ? "auto" : "1200px"};
  display: flex;
  flex-direction: ${props.i === 1 ? "column" : "row"};
  margin: auto;
  flex-wrap: wrap;
  align-items: ${props.i === 1 ? "end" : props.i === 0 ? "start" : "center"};
  justify-content: ${props.i === 1 ? "center" : "start"};
  padding :${props.noDesktop ? "0px 40px" : "0px"}
  
`
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
