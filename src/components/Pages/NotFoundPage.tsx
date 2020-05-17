import React from "react";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { H1 } from "../Atoms/Heading";
import { P } from "../Atoms/Text";

export const NotFoundPage = () => (
  <Container>
    <H1>Page Not Found</H1>
    <P>Did you mis-type? Or are you trying something fishy?</P>
    <P>
      Return to <a href="/">Homepage</a> | <a href="/play">Game</a>
    </P>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  > * {
    margin: ${GRID.HALF} ${GRID.UNIT};
  }
`;
