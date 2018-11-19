import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import ChevronRightIcon from "../Icons/ChevronRightIcon/ChevronRightIcon";

export default (props: LinkProps) => (
  <Link {...props} className={`${props.className || ""} m-icon-suffix`}>
    <span className="m-icon-suffix__text">{props.children}</span>
    <span className="m-icon-suffix__icon">
      <ChevronRightIcon />
    </span>
  </Link>
);
