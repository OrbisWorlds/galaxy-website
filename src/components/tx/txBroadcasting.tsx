import React from "react";
import styled from "@emotion/styled";
import { ButtonBase, Paper, Slide } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import broadcasting from "../../store/tx/broadcasting";

export function TxBroadcasting() {
  const dispatch = useAppDispatch();
  const failed = useAppSelector(s => s.tx.failed);
  const successful = useAppSelector(s => s.tx.successful);
  const { open } = useAppSelector(s => s.tx.broadcasting);

  React.useEffect(() => {
    if ((failed.open || successful.open) && open) {
      handleClose();
    }
  }, [failed.open, successful.open, open, dispatch]);

  const handleClose = () => {
    dispatch(broadcasting.actions.close());
  };

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <PaperWrap>
        <Content>
          <LoadingBar>
            <img alt="loading" src="/public/assets/images/loading.gif" />
          </LoadingBar>
          <span>
            Transaction Broadcastiong
            <br />
            <span>
              Waiting for transaction to be included
              <br /> in the block
            </span>
          </span>
        </Content>
        <Close onClick={handleClose}>
          <img alt="close" src="/public/assets/images/close.svg" />
        </Close>
      </PaperWrap>
    </Slide>
  );
}

const LoadingBar = styled("div")`
  background-color: #515f7f;
  border-radius: 200%;
  width: 42px;
  height: 42px;
  display: flex;
  margin-right: 20px;
  & img {
    margin: auto;
    width: 20px;
    height: 20px;
  }
`;

const PaperWrap = styled(Paper)`
  right: 20px;
  z-index: 10000;
  position: fixed;
  min-width: 470px;
  top: 20px;
`;

const Close = styled(ButtonBase)`
  position: absolute;
  right: 20px;
  top: 20px;
  border-radius: 100%;
  & img {
    width: 20px;
    height: 20px;
  }
`;

const Content = styled("div")`
  border-radius: 8px;
  padding: 30px 40px;
  background-color: #fff;
  display: flex;
  align-items: center;

  max-height: 148px;
  & span {
    display: block;
    color: #515f7f;
    font-size: 18px;
    font-family: "Heebo-Medium";
    & span {
      line-height: 24px;
      font-size: 16px;
      color: #999999;
      font-family: "Heebo-Regular";
    }
  }
`;
