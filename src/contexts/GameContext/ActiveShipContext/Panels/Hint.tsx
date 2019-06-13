import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../../../styles/variables";
import { H3 } from "../../../../components/Atoms/Heading/Heading";
import { useActiveShipContext } from "../ActiveShipContext";

export const Hint = () => {
  const { hint } = useActiveShipContext();
  return (
    <StyledHint as="p">{hint}</StyledHint>
  );
};

const StyledHint = styled(H3)`
    padding: ${GRID.UNIT};
    font-style: italic;
    text-align: center;
    line-height: 1.5;
    opacity: 0.6;
`;
