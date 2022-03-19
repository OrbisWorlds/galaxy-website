import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { Section } from ".";
import InterSection from "../../components/intersection";

const rs = [
  [430, 130],
  [517, 442],
  [795, 30],
  [931, 516],
  [1231, 112],
  [1377, 482]
];

interface Props {
  p: any[];
  title: string | React.ReactNode;
  number: number;
  description: string | React.ReactNode;
  primary?: boolean;
}

function RoadmapItem(props: Props) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: props.p[props.number - 1][1] + "px",
        left: props.p[props.number - 1][0]
      }}
    >
      <InterSection>
        {props.primary ? (
          <Typography
            variant="h5"
            sx={{
              color: "#9884ff",
              fontFamily: "Heebo-Bold"
            }}
          >
            {props.title}
          </Typography>
        ) : (
          <Box>
            <Typography
              sx={{
                color: "#9393dc",
                fontFamily: "Heebo-Regular"
              }}
              variant="subtitle2"
            >
              Roadmap #{props.number}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 1,
                color: "#ffffff",
                fontFamily: "Heebo-Bold"
              }}
            >
              {props.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#ffffff",
                fontFamily: "Heebo-Light"
              }}
            >
              {props.description}
            </Typography>
          </Box>
        )}
      </InterSection>
    </Box>
  );
}

export default function Roadmap() {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [positions, setPositions] = React.useState(rs);
  const [imgHeight, setImgHeight] = React.useState(0);

  const handleDetectRoadmapPosition = (cw: number) => {
    const sourceWidth = 1920;
    const ratio = cw / sourceWidth;
    setPositions(rs.map(([x, y]) => [x * ratio, y * ratio]));
  };

  React.useEffect(() => {
    if (!imgRef.current) {
      return;
    }
    const listener = (e: Event) => {
      if (imgRef.current)
        handleDetectRoadmapPosition(imgRef.current.offsetWidth);
    };
    handleDetectRoadmapPosition(imgRef.current.width);
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [imgRef]);

  return (
    <Section i={2}>
      <img
        onLoad={e => setImgHeight(e.currentTarget.offsetHeight)}
        ref={imgRef}
        alt="roadmap"
        src="/assets/images/roadmap.png"
        style={{
          width: "100vw",
          position: "absolute"
        }}
      />
      <RoadmapContainer
        sx={{
          height: imgHeight
        }}
      >
        <RoadmapItem
          p={positions}
          number={1}
          title="2022"
          description={<>Galaxy Network</>}
        />
        <RoadmapItem
          p={positions}
          number={2}
          title="1Q` 22"
          description={
            <>
              Galaxy Testnet Live
              <br />
              Galaxy Public Validator Invite
            </>
          }
        />
        <RoadmapItem
          p={positions}
          number={3}
          title="April` 22"
          description={
            <>
              Galaxy Mainnet Live
              <br />
              Airdrop <br />
              Osmosis LP
            </>
          }
        />

        <RoadmapItem
          p={positions}
          number={4}
          title="June` 22"
          description="Story NFT Platform"
        />

        <RoadmapItem
          p={positions}
          number={5}
          title="August` 22"
          description="Galaxy NFT Marketplace"
        />
        <RoadmapItem
          p={positions}
          number={6}
          primary
          title={
            <>
              Building
              <br />
              next generation
              <br />
              Metaverse
            </>
          }
          description="Galaxy NFT Marketplace"
        />
      </RoadmapContainer>
    </Section>
  );
}

const RoadmapContainer = styled("div")`
  width: 100%;
  margin: auto;
  z-index: 2;
  position: relative;
`;
