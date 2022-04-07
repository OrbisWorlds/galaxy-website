import { Box, styled, Link } from "@mui/material";
import useDeviceType from "../../hooks/useDeviceType";

interface Props {
  absolute?: boolean;
}
export default function Footer(props: Props) {
  const deviceType = useDeviceType();
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        padding: "0px 20px",
        ...(props.absolute && {
          position: "absolute",
          bottom: 0
        })
      }}
    >
      <Container dt={deviceType}>
        <IconLink target="_blank" href="https://github.com/galaxies-labs">
          <img src={"/public/assets/images/github.svg"} alt="github" />
        </IconLink>
        <IconLink target="_blank" href="https://medium.com/@galaxyuniverse">
          <img src={"/public/assets/images/medium.svg"} alt="medium" />
        </IconLink>
        <IconLink target="_blank" href="https://discord.gg/DkPNtpJQ8C">
          <img src={"/public/assets/images/discord.svg"} alt="discord" />
        </IconLink>
        <IconLink target="_blank" href="https://twitter.com/glxuniverse">
          <img src={"/public/assets/images/twitter.svg"} alt="twitter" />
        </IconLink>
      </Container>
    </Box>
  );
}
const Container = styled("div")(
  (props: { dt: string }) => `
  margin: auto;
  padding-top: ${props.dt === "mobile" ? "20px" : "30px"};
  padding-bottom: ${props.dt === "mobile" ? "30px" : "100px"};
  border-top: 1px solid #393645;
  display: flex;
  justify-content: flex-end;
  max-width: 1200px;
  width: 100%;
`
);

const IconLink = styled(Link)`
  padding-left: 10px;
  padding-right: 10px;
  &:last-child {
    padding-right: 0px;
  }
  & img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
`;
