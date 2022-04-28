import * as React from "react";
import {
  AppBar,
  ButtonBase,
  Slide,
  Toolbar as MaterialToolbar,
  Typography
} from "@mui/material";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import useDeviceType from "../../hooks/useDeviceType";
import { styled } from "@mui/system";
import { Link, useLocation, useNavigate } from "react-router-dom";
import deviceSize from "../../constants/deviceSize";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { connectWallet } from "../../store/wallet";

interface Props {
  wallet?: boolean;
}

export default function Toolbar(props: Props) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const trigger = useScrollTrigger();
  const navigate = useNavigate();
  const wallet = useAppSelector(s => s.wallet);

  const deviceType = useDeviceType();

  const handleConnectWallet = () => {
    dispatch(connectWallet());
  };

  return (
    <Slide direction="down" in={!trigger}>
      <AppBar
        sx={{
          pl: 2,
          pr: 2,
          pt: deviceType === "mobile" ? 1.5 : 3,
          pb: 5
        }}
        color="transparent"
        position="fixed"
        elevation={0}
      >
        <ToolbarWrap>
          <Title variant="h6" onClick={() => navigate("/")}>
            GALAXY
          </Title>

          {deviceType !== "mobile" && (
            <nav>
              <StyledLink
                sx={{
                  color: location.pathname.startsWith("/story")
                    ? "#5954cc"
                    : "#fff"
                }}
                to="/story"
              >
                Story
              </StyledLink>
              <StyledLink
                sx={{
                  color: location.pathname.startsWith("/nft")
                    ? "#5954cc"
                    : "#fff"
                }}
                to="/nft"
              >
                NFT
              </StyledLink>
              <StyledLink
                sx={{
                  color: location.pathname.startsWith("/stake")
                    ? "#5954cc"
                    : "#fff"
                }}
                to="/stake"
              >
                Stake
              </StyledLink>
              <StyledLink
                sx={{
                  color: location.pathname.startsWith("/vote")
                    ? "#5954cc"
                    : "#fff"
                }}
                to="/vote"
              >
                Vote
              </StyledLink>
              <StyledLink
                sx={{
                  color: location.pathname.startsWith("/airdrop")
                    ? "#5954cc"
                    : "#fff"
                }}
                to="/airdrop"
              >
                Airdrop
              </StyledLink>
            </nav>
          )}

          {props.wallet && (
            <Wallet disabled={wallet.connected} onClick={handleConnectWallet}>
              {wallet.connected ? (
                <img alt="wallet" src="/public/assets/images/ic-wallet.svg" />
              ) : (
                <img alt="connect" src="/public/assets/images/connect.svg" />
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
        </ToolbarWrap>
      </AppBar>
    </Slide>
  );
}

const ToolbarWrap = styled(MaterialToolbar)`
  display: flex;
  margin: auto;
  justify-content: center;
  max-width: ${deviceSize.desktopMin};
  width: 100%;
`;

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
  font-family: "Heebo-Bold";
  @media (max-width: ${deviceSize.tabletMin}) {
    font-size: 20px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  letter-spacing: 0.9px;
  padding: 20px 30px;
  font-family: "Heebo-Regular";
  &:focus,
  &:visited,
  &:link {
    text-decoration: none;
  }
  &:active,
  &:hover {
    text-decoration: none;
    color: #5954cc;
  }
`;
