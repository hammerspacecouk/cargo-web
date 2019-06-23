import * as React from "react";
import styled from "styled-components";
import { Loading } from "../../../Atoms/Loading";
import { IEffectUpgrade } from "../../../../interfaces";
import { EffectUpgrade } from "./EffectUpgrade";
import { ListUnstyled } from "../../../Atoms/List/ListUnstyled";
import { GRID } from "../../../../styles/variables";
import { COLOURS } from "../../../../styles/colours";
import { BREAKPOINTS } from "../../../../styles/media";

interface IProps {
  effects?: IEffectUpgrade[];
}

const List = styled(ListUnstyled)`
  ${BREAKPOINTS.XL`
      display: grid;
      grid-column-gap: ${GRID.DOUBLE};
      grid-template-columns: repeat(2, 1fr);
    `}
  ${BREAKPOINTS.MAX`
      grid-template-columns: repeat(3, 1fr);
    `}
`;

const ListItem = styled.li`
  padding: ${GRID.UNIT} ${GRID.HALF};
  border-bottom: solid 1px ${COLOURS.GREY.DARK};
  border-top: solid 1px ${COLOURS.GREY.DARK};
  margin-top: -1px;
`;

export const EffectUpgrades = ({ effects }: IProps): JSX.Element => {
  if (effects === undefined) {
    return <Loading />; // todo - nice loading state
  }

  return (
    <List>
      {effects.map((effect, index) => (
        <ListItem key={`effect-upgrades-${index}`}>
          <EffectUpgrade effect={effect} />
        </ListItem>
      ))}
    </List>
  );
};
