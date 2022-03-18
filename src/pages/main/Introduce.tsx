import * as React from "react";
import { Card, Container, Grid } from "@mui/material";

export default function Introduce() {
  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12} md={4} sm={12}>
          <Card>dsdsdd</Card>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Card>dsdsdd</Card>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Card>dsdsdd</Card>
        </Grid>
      </Grid>
    </Container>
  );
}
