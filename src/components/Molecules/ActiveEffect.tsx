import * as React from "react";
import { ITacticalOption } from "../../interfaces";
import { EffectDetail } from "./EffectDetail";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { COLOURS, hexToRGBa } from "../../styles/colours";
import { P } from "../Atoms/Text";
import { CountdownToTime } from "./CountdownToTime";

const StyledActiveEffect = styled.div`
  padding: ${GRID.HALF} ${GRID.UNIT};
  background: ${hexToRGBa(COLOURS.GREY.DARKEST, 0.7)};
  border-radius: ${GRID.HALF};
`;

export const ActiveEffect = ({ effectOption }: { effectOption: ITacticalOption }) => {
  let description = null;

  if (effectOption.hitsRemaining) {
    description = <P>{effectOption.hitsRemaining} hits remaining</P>;
  } else if (effectOption.expiry) {
    description = (
      <P>
        <CountdownToTime dateTime={effectOption.expiry} /> remaining
      </P>
    );
  }

  return (
    <StyledActiveEffect>
      <EffectDetail effect={effectOption.effect} altDescription={description} />
    </StyledActiveEffect>
  );
};
