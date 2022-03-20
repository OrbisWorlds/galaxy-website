import React from "react";
import { Box } from "@mui/material";
import InterSection from "../../components/intersection";

export default function Roadmap() {
  const renderSvgText = (data: {
    x: number;
    y: number;
    data: {
      t: string;
      fill: 1 | 2 | string;
      fontFamily: 1 | 2 | 3 | string;
      fontSize: number;
      mt?: number;
      n?: boolean;
    }[];
  }) => {
    return data.data.map((x, i) => {
      let fill = x.fill === 1 ? "#9884ff" : x.fill === 2 ? "#ffffff" : x.fill;

      let fontFamily =
        x.fontFamily === 1
          ? "Heebo-Regular"
          : x.fontFamily === 2
          ? "Heebo-Bold"
          : "Heebo-Light";

      const renderText = (t: string, nl: boolean, ti: number) => (
        <text
          key={i.toString()}
          fill={fill}
          fontFamily={fontFamily}
          x={data.x}
          fontSize={x.fontSize}
          y={
            data.y +
            x.fontSize +
            (x.mt || 0) +
            data.data.reduce(
              (b, a, i2) => (i2 < i ? a.fontSize + (a.mt || 0) : 0) + b,
              0
            ) +
            (nl ? x.fontSize * 1.25 * ti : 0)
          }
        >
          {t}
        </text>
      );

      return x.t.split("\n").map((x, i) => {
        return renderText(x, i !== 0, i);
      });
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1920,
        margin: "auto",
        position: "relative"
      }}
    >
      <svg
        viewBox="0 0 1920 611"
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <image
          x="0"
          y="0"
          href="/assets/images/roadmap.png"
          width={"100%"}
          height="100%"
        />
        <image
          width={"520"}
          height="520"
          x="1400"
          y="0"
          href="/assets/images/explosion.png"
        />
      </svg>
      <InterSection>
        <svg viewBox="0 0 1920 611">
          {renderSvgText({
            x: 430,
            y: 130,
            data: [
              {
                t: "Roadmap #1",
                fontFamily: 1,
                fill: 1,
                fontSize: 14
              },
              {
                t: "1Q` 22",
                fontFamily: 2,
                fill: 2,
                mt: 13,
                fontSize: 34
              },
              {
                t: "Galaxy Testnet Live\nGalaxy Public Validator Invite",
                fontFamily: 3,
                fill: 2,
                mt: 15,
                fontSize: 17
              }
            ]
          })}
          {renderSvgText({
            x: 517,
            y: 442,
            data: [
              {
                t: "Roadmap #2",
                fontFamily: 1,
                fill: 1,
                fontSize: 14
              },
              {
                t: "April 22",
                fontFamily: 2,
                fill: 2,
                mt: 13,
                fontSize: 34
              },
              {
                t: "Galaxy Mainnet Live\nGlx Airdrop\nOsmosis Lp Register",
                fontFamily: 3,
                fill: 2,
                mt: 15,
                fontSize: 17
              }
            ]
          })}
          {renderSvgText({
            x: 796,
            y: 29,
            data: [
              {
                t: "Roadmap #3",
                fontFamily: 1,
                fill: 1,
                fontSize: 14
              },
              {
                t: "June 22",
                fontFamily: 2,
                fill: 2,
                mt: 13,
                fontSize: 34
              },
              {
                t: "Publish Story Platform",
                fontFamily: 3,
                fill: 2,
                mt: 15,
                fontSize: 17
              }
            ]
          })}
          {renderSvgText({
            x: 931,
            y: 510,
            data: [
              {
                t: "Roadmap #4",
                fontFamily: 1,
                fill: 1,
                fontSize: 14
              },
              {
                t: "August 22",
                fontFamily: 2,
                fill: 2,
                mt: 13,
                fontSize: 34
              },
              {
                t: "Galaxy NFT Marketplace",
                fontFamily: 3,
                fill: 2,
                mt: 15,
                fontSize: 17
              }
            ]
          })}
          {renderSvgText({
            x: 1231,
            y: 112,
            data: [
              {
                t: "Roadmap #5",
                fontFamily: 1,
                fill: 1,
                fontSize: 14
              },
              {
                t: "November 22 ~",
                fontFamily: 2,
                fill: 2,
                mt: 13,
                fontSize: 34
              },
              {
                t: "Galaxy SDK Development",
                fontFamily: 3,
                fill: 2,
                mt: 15,
                fontSize: 17
              }
            ]
          })}
          <text
            x={1377}
            y={520}
            fill="#9884ff"
            fontSize={24}
            fontFamily="Heebo-Bold"
          >
            Building
          </text>
          <text
            x={1377}
            y={520 + 30}
            fill="#9884ff"
            fontSize={24}
            fontFamily="Heebo-Bold"
          >
            Next Generation
          </text>
          <text
            x={1377}
            y={520 + 60}
            fill="#9884ff"
            fontSize={24}
            fontFamily="Heebo-Bold"
          >
            Metaverse
          </text>
        </svg>
      </InterSection>
    </Box>
  );
}
