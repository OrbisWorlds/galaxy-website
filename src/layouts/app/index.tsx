import * as React from "react";
import { AppBar, CssBaseline, Slide, Toolbar, Typography } from "@mui/material";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import useDeviceType from "../../hooks/useDeviceType";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./footer";
import deviceSize from "../../constants/deviceSize";

interface Props {
  children?: React.ReactNode | undefined;
  background?: React.ReactElement;
  wallet?: boolean;
}

export default function AppLayout(props: Props) {
  const trigger = useScrollTrigger();
  const navigate = useNavigate();
  const deviceType = useDeviceType();

  const renderChildren = (
    <>
      {props.children}
      <Footer absolute={!Boolean(props.background)} />
    </>
  );
  return (
    <React.Fragment>
      <CssBaseline />
      <Slide direction="down" in={!trigger}>
        <AppBar
          sx={{
            pl: deviceType === "mobile" ? 2 : 0,
            pt: deviceType === "mobile" ? 1.5 : 3,
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
            <Title variant="h6" onClick={() => navigate("/")}>
              GALAXY
            </Title>

            {deviceType !== "mobile" && (
              <nav>
                <StyledLink to="/story">Story</StyledLink>
                <StyledLink to="/nft">NFT</StyledLink>
                <StyledLink to="/stake">Stake</StyledLink>
                <StyledLink to="/vote">Vote</StyledLink>
                <StyledLink to="/airdrop">Airdrop</StyledLink>
              </nav>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
      {props.background
        ? React.cloneElement(props.background, {
            children: renderChildren
          })
        : renderChildren}
    </React.Fragment>
  );
}

const Title = styled(Typography)`
  color: #fff;
  left: 0;
  font-size: 23px;
  letter-spacing: 4.6px;
  cursor: pointer;
  position: absolute;
  font-family: Heebo-Bold;
  @media (max-width: ${deviceSize.tabletMin}) {
    font-size: 20px;
  }
`;

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
