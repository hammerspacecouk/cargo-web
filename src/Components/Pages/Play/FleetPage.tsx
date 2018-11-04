import * as React from "react"
import { useFleetState } from "../../../hooks/useFleetState";
import { useSessionContext } from "../../../context/SessionContext";
import PlayerFlag from "../../Player/PlayerFlag";
import FleetShips from "../../Ship/FleetShips";
import DestroyedShips from "../../Ship/DestroyedShips";
import EventsList from "../../Events/EventsList";
import Rank from "../../Player/Rank";

export default () => {
  const { activeShips, destroyedShips, events } = useFleetState();
  const { player, rankStatus } = useSessionContext();

  return (
    <main className="t-play__content-contain">
      <div className="t-fleet">
        <div className="t-fleet__title-bar">
          <h1 className="t-fleet__title">My Fleet</h1>
          <div className="t-fleet__flag">
            <PlayerFlag player={player}/>
          </div>
        </div>
        <div className="t-fleet__main">
          <div className="t-fleet__ships">
            <FleetShips ships={activeShips}/>
            <DestroyedShips ships={destroyedShips}/>
          </div>
          <div className="t-fleet__aside">
            <EventsList events={events} firstPerson/>
            <Rank rankStatus={rankStatus} />
          </div>
        </div>
      </div>
    </main>
  );
};
