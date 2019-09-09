import * as React from "react";
import styled from "styled-components";
import { SanctuaryIcon } from "../../Icons/SanctuaryIcon";
import { InlineIcon, TINY_ICON } from "../../Atoms/Icon";
import { Prose } from "../../Atoms/Prose";
import { ShieldStrength } from "../../Molecules/ShieldStrength";
import { GRID } from "../../../styles/variables";
import { TutorialPanel } from "../../Molecules/TutorialPanel";
import { COLOURS } from "../../../styles/colours";

export const ShipsTutorial = () => {
  return (
    <TutorialPanel>
      <Prose>
        <p>
          You have left the safety of the Sanctuaries{" "}
          <InlineIcon size={TINY_ICON}>
            <SanctuaryIcon />
          </InlineIcon>
          . Your ship may be vulnerable to attack. The Ships panel shows you who is nearby and what weapons you may have
          to use against them.
        </p>
        <p>
          Remember, a Reticulum Shuttle is needed to complete your mission. Keep an eye on your shield strength. The
          Shield can be repaired in the Engineering panel
        </p>
        <ShieldDescription>
          <ShieldWrap>
            <ShieldStrength percent={100} />
          </ShieldWrap>
          <ShieldText>Full shield</ShieldText>
        </ShieldDescription>
        <ShieldDescription>
          <ShieldWrap>
            <ShieldStrength percent={75} />
          </ShieldWrap>
          <ShieldText>Shield OK</ShieldText>
        </ShieldDescription>
        <ShieldDescription>
          <ShieldWrap>
            <ShieldStrength percent={50} />
          </ShieldWrap>
          <ShieldText>Shield low</ShieldText>
        </ShieldDescription>
        <ShieldDescription>
          <ShieldWrap>
            <ShieldStrength percent={10} />
          </ShieldWrap>
          <ShieldText>
            Shield Critical
            <br />
            (destruction imminent)
          </ShieldText>
        </ShieldDescription>
      </Prose>
    </TutorialPanel>
  );
};

const ShieldDescription = styled.div`
  border-radius: 4px;
  background: ${COLOURS.BLACK.FULL};
  padding: ${GRID.HALF};
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: ${GRID.UNIT};
  }
`;
const ShieldWrap = styled.div`
  width: 40px;
  height: 40px;
  margin-right: ${GRID.UNIT};
`;
const ShieldText = styled.div`
  flex: 1;
`;
