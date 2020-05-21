import React from "react";
import styled from "styled-components";
import { H1 } from "@src/components/Atoms/Heading";
import { GRID } from "@src/styles/variables";

export const ShipGonePage = () => (
  <Container>
    <H1>Ship Not Found</H1>
    <p>Either it never existed, or it was destroyed. You may wish to avenge.</p>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  > * {
    margin: ${GRID.HALF} ${GRID.UNIT};
  }
`;
