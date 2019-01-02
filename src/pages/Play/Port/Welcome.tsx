import * as React from "react";
import { Icon, SMALL_ICON } from "../../../components/Atoms/Icon/Icon";
import { P } from "../../../components/Atoms/Text/Text";
import { ShieldIcon } from "../../../components/Icons/ShieldIcon/ShieldIcon";
import { MessageInfo } from "../../../components/Molecules/Message/Message";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { useSessionContext } from "../../../context/SessionContext";

export const Welcome = () => {
  const { rankStatus } = useSessionContext();
  const { port } = useCurrentShipContext();

  if (rankStatus.portsVisited !== 1) {
    return null;
  }
  // todo - tooltip tour
  return (
    <MessageInfo>
      <P>
        Welcome to {port.name} spaceport. It is a <strong>Safe Haven</strong>
        <abbr title="Safe Haven">
          <Icon size={SMALL_ICON}>
            <ShieldIcon />
          </Icon>
        </abbr>
        . It costs you nothing to be here and your ship cannot be harmed while
        it is here.
      </P>
      <P>
        This is your home spaceport. Any newly launched ships will set off from
        here
      </P>
    </MessageInfo>
  );
};
