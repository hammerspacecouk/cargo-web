import { IMission } from "../../interfaces";
import React from "react";
import { CheckboxChecked } from "../Icons/CheckboxCheckedIcon";
import { CheckboxEmpty } from "../Icons/CheckboxEmptyIcon";
import styled from "styled-components";
import { GRID } from "../../styles/variables";

export const Mission = ({ mission }: IProps) => {
  if (!mission) {
    return <div>LOCKED</div>;
  }
  // todo - nicer design. checkbox if achieved
  return (
    <div>
      <Check>{mission.collectedAt ? <CheckboxChecked /> : <CheckboxEmpty />}</Check>
      <div>
        <div>{mission.name}</div>
        <div>{mission.description}</div>
      </div>
    </div>
  );
};

const Check = styled.span`
  display: inline-block;
  width: 32px;
  margin-right: ${GRID.UNIT};
`;

interface IProps {
  mission?: IMission;
}
