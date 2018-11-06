import DirectionNW from "../Icons/DirectionNW";
import DirectionNE from "../Icons/DirectionNE";
import DirectionW from "../Icons/DirectionW";
import DirectionE from "../Icons/DirectionE";
import DirectionSW from "../Icons/DirectionSW";
import DirectionSE from "../Icons/DirectionSE";
import * as React from "react";

export default () => {
  return (
    <>
      <h2 className="table-head">Where next?</h2>
      <table className="destinations">
        <thead>
        <tr>
          <th>Direction</th>
          <th>Destination Port</th>
          <th>Distance</th>
          <th>Travel Time</th>
          <th>Earnings</th>
          <th>Go?</th>
        </tr>
        </thead>
        <tbody>
        {this.renderDirection(
          <DirectionNW/>,
          this.props.shipContext.directions.NW
        )}
        {this.renderDirection(
          <DirectionNE/>,
          this.props.shipContext.directions.NE
        )}
        {this.renderDirection(
          <DirectionW/>,
          this.props.shipContext.directions.W
        )}
        {this.renderDirection(
          <DirectionE/>,
          this.props.shipContext.directions.E
        )}
        {this.renderDirection(
          <DirectionSW/>,
          this.props.shipContext.directions.SW
        )}
        {this.renderDirection(
          <DirectionSE/>,
          this.props.shipContext.directions.SE
        )}
        </tbody>
      </table>
    </>
  );
};
