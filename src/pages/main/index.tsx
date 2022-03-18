import { Container, CssBaseline } from "@mui/material";
import * as React from "react";
import useDeviceType from "../../hooks/useDeviceType";
import AppLayout from "../../layouts/app";
import Introduce from "./Introduce";
import { Background, Section } from "./Section";

export default function Main() {
  const deviceType = useDeviceType();
  return (
    <AppLayout>
      <Background
        background={deviceType === "mobile" ? "main-bg-m.jpg" : "main-bg.jpeg"}
      >
        <Section></Section>
        <Section></Section>
        <Section></Section>
        <Section></Section>
      </Background>
    </AppLayout>
  );
}
