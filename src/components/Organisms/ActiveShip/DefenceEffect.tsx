import { IActionToken, ITacticalOption } from "../../../interfaces";
import { EffectActionButton } from "../../Molecules/EffectActionButton";
import { CountdownToTime } from "../../Molecules/CountdownToTime";
import { Effect } from "../../Molecules/Effect";
import * as React from "react";
import { useActiveShipContext } from "../../../contexts/ActiveShipContext/ActiveShipContext";
import styled from "styled-components";
import { Badge } from "../../Atoms/Badge";
import { GRID } from "../../../styles/variables";

const ActiveEffect = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const ActiveDetail = styled(Badge)`
  position: absolute;
  bottom: -${GRID.HALF};
  margin: 0 auto;
`;

interface IProps {
  option?: ITacticalOption;
}

// todo - inline bits
export const DefenceEffect = ({ option }: IProps) => {
  const { buttonsDisabled } = useActiveShipContext();

  if (!option) {
    return <Effect />;
  }

  // const {
  //   setFleetData,
  //   buttonsDisabled,
  //   enableButtons,
  //   disableButtons,
  // } = useFleetContext();

  const applyAction = async (token: IActionToken) => {
    alert("not!! yet!!!");
    // disableButtons();
    // const data = await ApiClient.tokenFetch(token);
    // setFleetData(data);
    // enableButtons();
  };

  if (option.actionToken) {
    return (
      <EffectActionButton
        key={option.effect.name}
        effect={option.effect}
        token={option.actionToken}
        disabled={buttonsDisabled}
        handler={applyAction}
      />
    );
  }

  let detail = null;
  if (option.hitsRemaining) {
    detail = <ActiveDetail subtle={true}>{option.hitsRemaining}</ActiveDetail>;
  } else if (option.expiry) {
    detail = (
      <ActiveDetail subtle={true}>
        <CountdownToTime dateTime={option.expiry} />
      </ActiveDetail>
    );
  }

  return (
    <ActiveEffect key={option.effect.name}>
      <Effect isActive={!!detail} disabled={!detail} effect={option.effect} />
      {detail}
    </ActiveEffect>
  );
};
