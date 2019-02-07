import { IEffect } from "../../../Interfaces";
import * as React from "react";
import { TextCenter } from "../../Atoms/Text/Text";
import styled from "styled-components";
import { ListUnstyled } from "../../Atoms/Lists/ListUnstyled/ListUnstyled";
import { GRID } from "../../../styles/variables";

interface IProps {
  effects?: IEffect[];
}

const StyledEffect = styled(ListUnstyled)`
  border-radius: 50%;
  max-width: 160px;
  padding: ${GRID.UNIT};
  background: black;
  color: white;
  border: solid 2px white;
  text-align: center;
`;

export const BonusEffects = React.memo(({ effects }: IProps) => {
  if (effects === undefined || effects.length === 0) {
    return null;
  }
  return (
    <>
      <TextCenter as="h3">BONUS EARNED</TextCenter>
      <ListUnstyled>
        {effects.map(effect => (
          <StyledEffect key={effect.name}>{effect.name}</StyledEffect>
        ))}
      </ListUnstyled>
    </>
  );
});
