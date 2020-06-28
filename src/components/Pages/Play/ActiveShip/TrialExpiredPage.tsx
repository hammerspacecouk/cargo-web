import React from "react";
import styled from "styled-components";
import { H1 } from "@src/components/Atoms/Heading";
import { GRID } from "@src/styles/variables";
import { ConfirmButton } from "@src/components/Atoms/Button";
import { routes } from "@src/routes";

export const TrialExpiredPage = () => (
  <Container>
    <H1>Trial Expired</H1>
    <p>To continue playing, please upgrade to the full game</p>
    <ConfirmButton as="a" href={routes.getPurchaseUpgrade()}>
      Upgrade
    </ConfirmButton>
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
