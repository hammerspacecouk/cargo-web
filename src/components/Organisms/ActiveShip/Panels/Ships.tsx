import * as React from "react";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { PlayerShipList } from "@src/components/Organisms/PlayerShipList";
import { IActionToken, IEffectAction } from "@src/interfaces";
import { AttackButton, DangerButton } from "@src/components/Atoms/Button";
import { Modal } from "@src/components/Molecules/Modal";
import { GridWrapper } from "@src/components/Atoms/GridWrapper";
import styled from "styled-components";
import { BREAKPOINTS } from "@src/styles/media";
import { getEffectColour } from "@src/components/Atoms/EffectSymbol";
import { ActionPane, ActionPaneButton, ActionPaneDetail } from "@src/components/Molecules/ActionPane";
import { EffectDetail } from "@src/components/Molecules/EffectDetail";
import { TokenButton } from "@src/components/Molecules/TokenButton";
import { GRID } from "@src/styles/variables";

export const Ships = () => {
  const { shipsInLocation, buttonsDisabled, portActionHandler } = useActiveShipContext();
  const [chooseOffenceOptions, setChooseOffenceOptions] = React.useState<IEffectAction[]>(null);

  let chooseOffenceModal;
  if (chooseOffenceOptions) {
    chooseOffenceModal = (
      <Modal isOpen={true} title="Choose Weapon" onClose={() => setChooseOffenceOptions(null)}>
        <Choose>
          <GridWrapper as="ul">
            {chooseOffenceOptions.map((option) => (
              <Option key={option.effect.id}>
                <ActionPane highlightColor={getEffectColour({ effect: option.effect })}>
                  <ActionPaneDetail>
                    <EffectDetail effect={option.effect} currentCount={option.currentCount} />
                  </ActionPaneDetail>
                  <ActionPaneButton>
                    <TokenButton
                      token={option.actionToken}
                      handler={async (token: IActionToken) => {
                        await portActionHandler(token);
                        setChooseOffenceOptions(null);
                      }}
                    >
                      <DangerButton disabled={buttonsDisabled}>Fire</DangerButton>
                    </TokenButton>
                  </ActionPaneButton>
                </ActionPane>
              </Option>
            ))}
          </GridWrapper>
        </Choose>
      </Modal>
    );
  }

  return (
    <>
      <PlayerShipList
        ships={shipsInLocation}
        getActionButton={(offenses?: IEffectAction[], inactiveReason?: string) => {
          if (inactiveReason) {
            return <DangerButton disabled>{inactiveReason}</DangerButton>;
          }
          if (!offenses?.length) {
            return null;
          }
          return <AttackButton disabled={buttonsDisabled} onClick={() => setChooseOffenceOptions(offenses)} />;
        }}
      />
      {chooseOffenceModal}
    </>
  );
};

const Option = styled.li`
  width: 100%;
  ${BREAKPOINTS.XS`width: 50%;`}
`;

const Choose = styled.div`
  width: calc(100vw - ${GRID.QUADRUPLE});
  max-width: 500px;
`;
