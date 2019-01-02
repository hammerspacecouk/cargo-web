import * as React from "react";
import styled from "styled-components";
import { ICrate } from "../../../Interfaces";
import { COLOURS } from "../../../styles/colours";
import { Crate } from "../../Icons/Crate/Crate";

interface IProps {
  crate: ICrate;
}

const StyledCrateContents = styled.div`
  position: relative;
  width: 60px;
`;

const StyledCrate = styled.div`
  display: inline-block;
  line-height: 0;
  width: 60px;
  height: 40px;
`;

const Side = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 22px;
  line-height: 40px;
  text-align: center;
  font-size: 1.2rem;
  perspective: 100px;
  perspective-origin: left;
`;

const StyledContent = styled.div`
  transform: rotateY(-40deg);
  color: ${COLOURS.BLACK.STANDARD};
`;

export const CrateContents = styled.span`
  font-family: "Segoe UI Emoji", sans-serif;
`;

const getColour = (value: number): string => {
  if (value >= 12) {
    return COLOURS.CRATE.LEVEL6;
  }
  if (value >= 6) {
    return COLOURS.CRATE.LEVEL5;
  }
  if (value >= 4) {
    return COLOURS.CRATE.LEVEL4;
  }
  if (value >= 3) {
    return COLOURS.CRATE.LEVEL3;
  }
  if (value >= 2) {
    return COLOURS.CRATE.LEVEL2;
  }
  if (value >= 1) {
    return COLOURS.CRATE.LEVEL1;
  }
  return COLOURS.CRATE.LEVEL0;
};

export const CrateWithContents = ({ crate }: IProps) => (
  <StyledCrateContents>
    <StyledCrate>
      <Crate colour={getColour(crate.value)} />
    </StyledCrate>
    <Side>
      <StyledContent>
        <CrateContents>{crate.contents}</CrateContents>
      </StyledContent>
    </Side>
  </StyledCrateContents>
);

export const PlaceholderContents = () => (
  <StyledCrateContents>
    <StyledCrate>
      <Crate colour="rgba(255,255,255, 0.3)" />
    </StyledCrate>
  </StyledCrateContents>
);
