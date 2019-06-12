import styled from "styled-components";
import { MONOSPACE_FONT } from "../../styles/typography";
import { TextD, TextF } from "./Text/Text";
import * as React from "react";
import { Fraction } from "./Fraction/Fraction";

const StyledDistance = styled.div`
  ${MONOSPACE_FONT};
  font-variant: small-caps;
`;

export const Distance = ({ value }: { value: number }) => {
  let distance = <TextD>{value}</TextD>;
  if (value === 0) {
    distance = <Fraction num={1} den={100} />;
  }

  return (
    <StyledDistance>
      {distance}
      <abbr title="light years">
        <TextF>ly</TextF>
      </abbr>
    </StyledDistance>
  );
};
