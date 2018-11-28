import * as React from "react";
import ShieldIcon from "../../../components/Icons/ShieldIcon/ShieldIcon";
import { useSessionContext } from "../../../context/SessionContext";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import MessageInfo from "../../../components/Molecules/Messages/MessageInfo/MessageInfo";

export default () => {
  const { rankStatus } = useSessionContext();
  const { port } = useCurrentShipContext();

  if (rankStatus.portsVisited !== 1) {
    return null;
  }
  // todo - tooltip tour
  return (
    <MessageInfo>
      <p>
        Welcome to {port.name} spaceport. It is a <strong>Safe Haven</strong>
        <abbr title="Safe Haven" className="icon icon--mini">
          <ShieldIcon />
        </abbr>. It costs you nothing to be here and your ship cannot be harmed
        while it is here.
      </p>
      <p>
        This is your home spaceport. Any newly launched ships will set off from
        here
      </p>
    </MessageInfo>
  );
};
