import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

interface Props {
  onClose: () => void;
  maxWidth?: number | string;
  children: React.ReactNode;
}

export default function Popup(props: Props) {
  return (
    <Container>
      <Content
        sx={{
          maxWidth: props.maxWidth || "700px"
        }}
      >
        <Close
          onClick={props.onClose}
          alt="close"
          src="/public/assets/images/close.svg"
        />
        {props.children}
      </Content>
    </Container>
  );
}

const Close = styled("img")`
  position: absolute;
  right: 24px;
  top: 24px;
  width: 21px;
  height: 21px;
  cursor: pointer;
`;

const Content = styled(Box)`
  background-color: #fff;
  border-radius: 8px;
  position: relative;
  overflow-y: auto;
  max-height: 90vh;
  margin: auto;
  width: 100%;
`;

const Container = styled("div")`
  position: fixed;
  z-index: 9999;
  left: 0;
  right: 0;
  overflow-y: hidden;
  display: flex;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;
