import { IActionToken, IPort, IShip, ITacticalOption } from "@src/interfaces";
import React, { useEffect, useState } from "react";
import { ApiClient } from "@src/utils/ApiClient";
import { Loading } from "@src/components/Atoms/Loading";
import { GRID } from "@src/styles/variables";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { ConfirmButton } from "@src/components/Atoms/Button";
import { TokenButton } from "@src/components/Molecules/TokenButton";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { PANEL_INNER_DIVIDER_BORDER } from "@src/styles/colours";

interface IProps {
  option: ITacticalOption;
  ship: IShip;
  onComplete: () => void;
}

export const SpecialPanel = ({ option, ship }: IProps) => {
  switch (option.effect.id) {
    case "ab5a97d4-12ae-4c7b-8f95-102ee01aa74c":
      return <WormholePanel ship={ship} />;
    default:
      return <span>Unknown. Something went wrong!</span>;
  }
};

const WormholePanel = ({ ship }: { ship: IShip }) => {
  const { portActionHandler, buttonsDisabled } = useActiveShipContext();
  const [going, setGoing] = useState(false);
  const [actions, setActions] = useState<{ port: IPort; actionToken: IActionToken }[]>();

  const getActions = async () => {
    const res = await ApiClient.fetch(`/play/${ship.id}/wormhole`);
    setActions(res.actions);
  };

  useEffect(() => {
    getActions();
  }, []);

  let list = <Loading />;
  if (actions !== undefined) {
    if (actions?.length) {
      list = (
        <ul>
          {actions.map((action) => (
            <Row key={action.port.id}>
              {action.port.name}
              <TokenButton
                token={action.actionToken}
                handler={async (token: IActionToken) => {
                  try {
                    setGoing(true);
                    await portActionHandler(token);
                    setActions(undefined);
                    window.setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  } catch (e) {
                    setGoing(false);
                  }
                }}
              >
                <ConfirmButton disabled={buttonsDisabled}>Go</ConfirmButton>
              </TokenButton>
            </Row>
          ))}
        </ul>
      );
    } else {
      list = <p>You haven't visited enough planets to populate a list</p>;
    }
  }

  return (
    <div>
      {going && <Going />}
      <Intro>
        The wormhole allows you to instantly move this ship (without convoy) to a safe zone that you have already
        visited. Which planet would you like to move <em>{ship.name}</em> to?
      </Intro>
      {list}
    </div>
  );
};

const Intro = styled.p`
  margin-bottom: ${GRID.UNIT};
`;

const Row = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:not(:last-child) {
    padding-bottom: ${GRID.HALF};
    margin-bottom: ${GRID.HALF};
    border-bottom: ${PANEL_INNER_DIVIDER_BORDER};
  }
`;

const frames = keyframes`
    0% {
        border-radius: 0;
        transform: rotate(0) scale(1);
    }
    100% {
        border-radius: 100%;
        transform: rotate(720deg) scale(0.01);
    }
`;

export const Going = createGlobalStyle`
    html {
      overflow-x: hidden;
    }
    body {
      overflow: hidden;
      animation: ${frames} forwards 2s ease-in 1;
    }
`;
