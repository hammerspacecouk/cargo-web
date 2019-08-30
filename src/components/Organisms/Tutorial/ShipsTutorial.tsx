import * as React from "react";
import styled from "styled-components";
import { Modal, ModalActions } from "../../Molecules/Modal";
import { ConfirmButton } from "../../Atoms/Button";
import { useState } from "react";
import { SanctuaryIcon } from "../../Icons/SanctuaryIcon";
import { InlineIcon, TINY_ICON } from "../../Atoms/Icon";
import { Prose } from "../../Atoms/Prose";
import { ShieldStrength } from "../../Molecules/ShieldStrength";
import { GRID } from "../../../styles/variables";

export const ShipsTutorial = () => {
  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  return (
    <Modal isOpen={isOpen} title="Tutorial">
      <Prose>
        <p>
          You have left the safety of the Sanctuaries <InlineIcon size={TINY_ICON}><SanctuaryIcon/></InlineIcon>.
          Your ship may be vulnerable to attack.
          The Ships panel shows you who is nearby and what weapons you may have to use against them.
        </p>
        <p>
          Remember, a Reticulum Shuttle is needed to complete your mission. Keep an eye on your shield strength.
        </p>
        <Shields>
          <ShieldDescription>
            <ShieldWrap>
              <ShieldStrength percent={1}/>
            </ShieldWrap>
            <ShieldText>Full shield</ShieldText>
          </ShieldDescription>
          <ShieldDescription>
            <ShieldWrap>
              <ShieldStrength percent={0.75}/>
            </ShieldWrap>
            <ShieldText>Shield OK</ShieldText>
          </ShieldDescription>
          <ShieldDescription>
            <ShieldWrap>
              <ShieldStrength percent={0.5}/>
            </ShieldWrap>
            <ShieldText>Shield low</ShieldText>
          </ShieldDescription>
          <ShieldDescription>
            <ShieldWrap>
              <ShieldStrength percent={0.1}/>
            </ShieldWrap>
            <ShieldText>Shield Critical<br />(destruction imminent)</ShieldText>
          </ShieldDescription>
        </Shields>
      </Prose>
      <ModalActions>
        <ConfirmButton onClick={close}>Ok</ConfirmButton>
      </ModalActions>
    </Modal>
  );
};

const Shields = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 ${GRID.HALF};
`;
const ShieldDescription = styled.div`
  padding: 0 ${GRID.HALF};
  margin-bottom: ${GRID.UNIT};
  width: 50%;
  display: flex;
  align-items: center;
`;
const ShieldWrap = styled.div`
  width: 40px;
  height: 40px;
  margin-right: ${GRID.UNIT};
`;
const ShieldText = styled.div`
  flex: 1;
`;
