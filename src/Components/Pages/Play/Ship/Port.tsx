import * as React from "react";
import { useCurrentShipContext } from "../../../../context/CurrentShipContext";
import ShipList from "../../../Ship/ShipList";
import EventsList from "../../../Events/EventsList";
import Welcome from "../../../Play/Welcome";
import Crates from "../../../Play/Crates";
import Directions from "../../../Play/Directions";
import Modal from "../../../Panel/Modal";

export default () => {
  const { ship, port } = useCurrentShipContext();

  const modal = (
    <Modal
      isOpen={this.state.modalOpen}
      onClose={this.closeModal}
      title="Are you sure?"
    >
      <p>
        You have not picked up any crates. Are you sure you want to take off?
      </p>
      <div className="modal__action">
        {this.state.confirmMoveButton}
        <button
          className="button button--soft-danger"
          onClick={this.closeModal}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );

  return (
    <div>
      <h1>
        {port.name} {safe}
      </h1>
      <Welcome/>
      <Crates/>
      <Directions />

      <h2>Players</h2>
      <ShipList ships={this.props.shipContext.shipsInLocation}/>

      <EventsList events={this.props.shipContext.events}/>
      {modal}
    </div>
  );
};
