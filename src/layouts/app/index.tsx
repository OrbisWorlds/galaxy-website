import * as React from "react";
import { CssBaseline } from "@mui/material";
import Footer from "./footer";
import { useAppDispatch } from "../../store/hooks";
import Toolbar from "./toolbar";

interface Props {
  children?: React.ReactNode | undefined;
  background?: React.ReactElement;
  wallet?: boolean;
}

export default function AppLayout(props: Props) {
  const renderChildren = (
    <>
      {props.children}
      <Footer absolute={!Boolean(props.background)} />
    </>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Toolbar wallet={props.wallet} />
      {props.background
        ? React.cloneElement(props.background, {
            children: renderChildren
          })
        : renderChildren}
    </React.Fragment>
  );
}
