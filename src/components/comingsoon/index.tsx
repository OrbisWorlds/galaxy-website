import { Box, styled } from "@mui/material";
import useDeviceType, { DeviceSize } from "../../hooks/useDeviceType";
export default function ComingSoon() {
  const deviceType = useDeviceType();
  return (
    <Container>
      <Bg alt="comingsoon-bg" src="/assets/images/comingsoon-bg.jpg" />
      <Center dt={deviceType}>
        <img alt="comingsoon" src="/assets/images/comingsoon.svg" />
        <img alt="moon" src="/assets/images/moon.png" />
      </Center>
    </Container>
  );
}

const Center = styled(Box)(
  (p: { dt: DeviceSize }) => `
  width: ${p.dt === "desktop" ? "30vw" : "80%"};
  z-index: 2;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  & img {
    width: 100%;
    position: absolute;

    :first-child {
      margin-right: 15%;
      z-index: 2;
      width: 60%;
      position: absolute;
    }
  }
`
);
const Bg = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Container = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #000;
  justify-content: center;
`;
