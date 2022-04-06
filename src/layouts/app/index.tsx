import * as React from "react";
import {
  AppBar,
  ButtonBase,
  CssBaseline,
  Slide,
  Toolbar,
  Typography
} from "@mui/material";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import useDeviceType from "../../hooks/useDeviceType";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./footer";
import deviceSize from "../../constants/deviceSize";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { connectWallet } from "../../store/wallet";

interface Props {
  children?: React.ReactNode | undefined;
  background?: React.ReactElement;
  wallet?: boolean;
}

export default function AppLayout(props: Props) {
  const dispatch = useAppDispatch();
  const trigger = useScrollTrigger();
  const navigate = useNavigate();
  const wallet = useAppSelector(s => s.wallet);

  const deviceType = useDeviceType();

  const handleConnectWallet = () => {
    dispatch(connectWallet());
  };

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

            {props.wallet && (
              <Wallet disabled={wallet.connected} onClick={handleConnectWallet}>
                {wallet.connected ? (
                  <img alt="wallet" src="/assets/images/ic-wallet.svg" />
                ) : (
                  <img alt="connect" src="/assets/images/connect.svg" />
                )}
                <span>
                  {wallet.connected
                    ? `galaxy${wallet.address
                        .replace("galaxy", "")
                        .substring(0, 3)}...${wallet.address.substring(
                        wallet.address.length - 6
                      )}`
                    : "connect"}
                </span>
              </Wallet>
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

const Wallet = styled(ButtonBase)`
  position: absolute;
  right: 0;
  & span {
    margin-left: 9px;
    font-size: 14px;
    color: #fff;
  }
`;

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
