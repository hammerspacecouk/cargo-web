import * as React from "react";
import PortInterface from "../interfaces/PortInterface";
import ShieldIcon from "./Icons/ShieldIcon/ShieldIcon";
import Icon, { SMALL_ICON } from "./Atoms/Icon/Icon";

interface InlinePortNameProps {
  port: PortInterface;
}

export const InlinePortName = ({ port }: InlinePortNameProps) => {
  let safe = null;
  if (port.safeHaven) {
    safe = ( // todo - abstract safe haven marker
      <abbr title="Safe Haven">
        <Icon size={SMALL_ICON}>
          <ShieldIcon />
        </Icon>
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
