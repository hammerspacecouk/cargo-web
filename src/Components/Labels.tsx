import * as React from "react";
import PortInterface from "../interfaces/PortInterface";
import ShieldIcon from "./Icons/ShieldIcon/ShieldIcon";

interface InlinePortNameProps {
  port: PortInterface;
}
export const InlinePortName = ({ port }: InlinePortNameProps) => {
  let safe = null;
  if (port.safeHaven) {
    safe = (
      <abbr title="Safe Haven" className="m-icon-suffix__icon">
        <ShieldIcon />
      </abbr>
    );
  }
  return (
    <span className="m-icon-suffix">
      <span className="m-icon-suffix__text">{port.name}</span>
      {safe}
    </span>
  );
};
