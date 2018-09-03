import * as React from "react";

interface Props {
  children: any;
  icon: any;
  disabled?: boolean;
  type?: string
}

export default (props: Props) => (
  <button
    className="button"
    disabled={props.disabled !== undefined ? props.disabled : false}
    type={props.type !== undefined ? props.type : 'submit'}
  >
    {props.icon}
    {props.children}
  </button>
);
