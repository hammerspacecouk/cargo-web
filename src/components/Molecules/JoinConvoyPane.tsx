import * as React from "react";
import { ActionButton } from "@src/components/Atoms/Button";
import { TokenButton } from "./TokenButton";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { ActionPane, ActionPaneButton, ActionPaneDetail } from "./ActionPane";
import { Modal } from "./Modal";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS, PANEL_INNER_DIVIDER_BORDER } from "@src/styles/colours";
import { ConvoyIcon } from "@src/components/Icons/ConvoyIcon";
import { H4 } from "@src/components/Atoms/Heading";
import { ShieldStrength } from "./ShieldStrength";
import { Prose } from "@src/components/Atoms/Prose";
import { IActionToken, IChildrenProps } from "@src/interfaces";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { IFleetResponse } from "@src/data/game";
import { useMounted } from "@src/hooks/useMounted";

export const JoinConvoyPane = () => {
  const { updateFleet } = useGameSessionContext();
  const { portActionHandler, buttonsDisabled, convoys } = useActiveShipContext();
  const [chooseShipOpen, setChooseShipOpen] = React.useState(false);
  const isMounted = useMounted();

  if (convoys === null) {
    return null;
  }

  const handler = async (token: IActionToken) => {
    const response: { fleet: IFleetResponse } = await portActionHandler(token);
    updateFleet(response.fleet.ships);
    if (isMounted()) {
      setChooseShipOpen(false);
    }
  };

  const chooseShipPanel = (
    <Modal isOpen={chooseShipOpen} title="Create/Join Convoy" onClose={() => setChooseShipOpen(false)}>
      <StyledProse>
        <p>
          When you join two or more of your ships into convoy, their combined strength will be used to calculate their
          eligibility to travel to dangerous areas. All ships in a convoy will travel together, at the speed of the
          slowest ship.
        </p>
      </StyledProse>
      <ul>
        {convoys.map((convoy) => (
          <Convoy key={convoy.token.token}>
            <ul>
              {convoy.ships.map((ship) => (
                <Ship key={ship.id}>
                  <ShipIcon>
                    <ShieldStrength percent={ship.strengthPercent} ship={ship} />
                  </ShipIcon>
                  <ShipName>{ship.name}</ShipName>
                </Ship>
              ))}
            </ul>
            <JoinButton token={convoy.token} handler={handler}>
              <ActionButton type="submit" disabled={buttonsDisabled}>
                {convoy.ships.length > 1 ? "Join" : "Create"}
              </ActionButton>
            </JoinButton>
          </Convoy>
        ))}
      </ul>
    </Modal>
  );

  let convoyButton = <ActionButton disabled={true}>No friends here</ActionButton>;
  if (convoys.length) {
    convoyButton = (
      <ActionButton disabled={buttonsDisabled} onClick={() => setChooseShipOpen(true)}>
        Join Convoy
      </ActionButton>
    );
  }

  return (
    <>
      <ConvoyPane text="Create a convoy to travel as one and combine your strength">{convoyButton}</ConvoyPane>
      {chooseShipPanel}
    </>
  );
};

interface IConvoyPaneProps extends IChildrenProps {
  text: string;
}
export const ConvoyPane = ({ text, children }: IConvoyPaneProps) => (
  <ActionPane highlightColor={COLOURS.SEMANTIC.INFO.KEY}>
    <ActionPaneDetail>
      <IconWrap>
        <ConvoyIcon />
      </IconWrap>
      <Title as="h3">Convoy</Title>
      <p>{text}</p>
    </ActionPaneDetail>
    <ActionPaneButton>{children}</ActionPaneButton>
  </ActionPane>
);

const IconWrap = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto ${GRID.HALF};
`;
const Title = styled(H4)`
  margin-bottom: ${GRID.HALF};
`;

const Convoy = styled.li`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: ${GRID.UNIT};
    padding-bottom: ${GRID.UNIT};
    border-bottom: ${PANEL_INNER_DIVIDER_BORDER};
  }
`;

const StyledProse = styled(Prose)`
  margin-bottom: ${GRID.UNIT};
`;

const Ship = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${GRID.QUARTER};
`;
const ShipIcon = styled.div`
  width: 36px;
  margin-right: ${GRID.UNIT};
`;
const ShipName = styled.div`
  flex: 1;
`;
const JoinButton = styled(TokenButton)`
  text-align: right;
  display: block;
`;
