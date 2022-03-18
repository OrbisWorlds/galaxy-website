import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import useDeviceType from "../../hooks/useDeviceType";

export default function Footer() {
  const deviceType = useDeviceType();
  return (
    <Box
      component="footer"
      sx={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: "0px 20px"
      }}
    >
      <Container dt={deviceType}>
        <IconLink dt={deviceType} to="/">
          <img src={"/assets/images/footer-github.png"} alt="github" />
        </IconLink>
        <IconLink dt={deviceType} to="/">
          <img src={"/assets/images/footer-telegram.png"} alt="telegram" />
        </IconLink>
        <IconLink dt={deviceType} to="/">
          <img src={"/assets/images/footer-discord.png"} alt="discord" />
        </IconLink>
        <IconLink dt={deviceType} to="/">
          <img src={"/assets/images/footer-twitter.png"} alt="twitter" />
        </IconLink>
      </Container>
    </Box>
  );
}

const Container = styled("div")(
  (props: { dt: string }) => `
  margin: auto;
  padding-top: 30px;
  padding-bottom: ${props.dt === "mobile" ? "30px" : "100px"};
  border-top: 1px solid #393645;
  display: flex;
  justify-content: end;
  max-width: 1200px;
  width: 100%;
`
);

const IconLink = styled(Link)(
  (props: { dt: string }) => `
  padding-left: ${props.dt === "mobile" ? "20px" : "10px"};
  padding-right: ${props.dt === "mobile" ? "20px" : "10px"};
  &:last-child {
    padding-right: 0px;
  }
  & img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
`
);
