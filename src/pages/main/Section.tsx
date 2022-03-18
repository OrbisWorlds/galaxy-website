import * as React from "react";
import { styled } from "@mui/system";

export const Section = styled("section")`
  min-height: 100vh;
`;
export const Background = styled("div")(
  ({ background }: { background: string }) =>
    `
  background-image: url(/assets/images/${background});
  background-size:  cover;
  background-repeat: no-repeat;
`
);
