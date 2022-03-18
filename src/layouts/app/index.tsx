import * as React from "react";
import { AppBar, CssBaseline, Slide, Toolbar, Typography } from "@mui/material";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import useDeviceType from "../../hooks/useDeviceType";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout(props: Props) {
  const trigger = useScrollTrigger();
  const deviceType = useDeviceType();

  return (
    <React.Fragment>
      <CssBaseline />
      <Slide direction="down" in={!trigger}>
        <AppBar
          sx={{
            pl: deviceType === "mobile" ? 5 : 0,
            pt: deviceType === "mobile" ? 3 : 5,
            pb: 5
          }}
          color="transparent"
          position="fixed"
          elevation={0}
        >
          <Toolbar
            sx={{
              display: "flex",
              margin: "auto",
              justifyContent: "center",
              maxWidth: "1200px",
              width: "100%"
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                left: 0,
                fontSize: 23,
                pl: deviceType === "tablet" ? 4 : 0,
                letterSpacing: 4.6,
                position: "absolute"
              }}
              variant="h6"
              fontFamily={"Heebo-Bold"}
            >
              GALAXY
            </Typography>
            {deviceType !== "mobile" && (
              <nav>
                <StyledLink to="/lore">Lore</StyledLink>
                <StyledLink to="/nft">NFT</StyledLink>
                <StyledLink to="/stake">Stake</StyledLink>
                <StyledLink to="/vote">Vote</StyledLink>
                <StyledLink to="/airdrop">Airdrop</StyledLink>
              </nav>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
      {props.children}
      <Footer />
    </React.Fragment>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  letter-spacing: 0.9px;
  padding: 20px 30px;
  font-family: "Heebo-Regular";
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
