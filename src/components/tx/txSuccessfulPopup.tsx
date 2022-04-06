import React from "react";
import styled from "@emotion/styled";
import { ButtonBase, Paper, Slide } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import successful from "../../store/tx/successful";

export function TxSuccessfulPopup() {
  const dispatch = useAppDispatch();
  const { open, transactionHash } = useAppSelector(s => s.tx.successful);

  React.useEffect(() => {
    if (open) {
      let tm = setTimeout(() => {
        handleClose();
      }, 2000);
      return () => {
        clearTimeout(tm);
      };
    }
  }, [dispatch, open]);

  const handleClose = () => {
    dispatch(successful.actions.close());
  };

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <PaperWrap>
        <Content>
          <img alt="waning" src="/assets/images/successful.svg" />
          <span>
            Transaction Successful
            {/*
            <br />
            <span>View explorer</span>
              
              */}
          </span>
        </Content>
        <Close onClick={handleClose}>
          <img alt="close" src="/assets/images/close.svg" />
        </Close>
      </PaperWrap>
    </Slide>
  );
}

const PaperWrap = styled(Paper)`
  right: 20px;
  z-index: 10000;
  position: fixed;
  top: 20px;
  width: 100%;
  max-width: 470px;
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
  padding: 30px 44px;
  background-color: #fff;
  display: flex;
  align-items: center;
  & img {
    width: 42px;
    height: 42px;
    margin-right: 20px;
  }
  & span {
    display: block;
    color: #515f7f;
    font-size: 18px;
    font-family: Heebo-Medium;
    & span {
      line-height: 24px;
      font-size: 16px;
      color: #999999;
      font-family: Heebo-Regular;
    }
  }
`;
