import * as React from "react";
import { Link } from "react-router-dom";

export const ShipNavigation = () => (
  <nav>
    <ul>
      <li><Link to={"/a"}>Status</Link></li>
      <li><Link to={"/a"}>Directions</Link></li>
    </ul>
  </nav>
);
