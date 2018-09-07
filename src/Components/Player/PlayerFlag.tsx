import * as React from "react";
import PlayerInterface from "../../DomainInterfaces/PlayerInterface";

export interface Props {
  player: PlayerInterface;
}

export default (props: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101.79 76.37">
      <path
        fill={props.player.colour}
        d="M101.52 62.25a84.47 84.47 0 0 1-24.52 6c-15.34 1.38-22.44-2.35-36.27-1.48-7.26.46-18.1 2.3-31.21 9.2Q4.9 45 .27 14.08a88.11 88.11 0 0 1 29.36-8.16C44 4.6 51.06 7.76 66.53 6.34a97.1 97.1 0 0 0 25.75-6z"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        fill="#fff"
        d="M50.58 22.79l5.06 7.55 9.08.11-5.62 7.14 2.7 8.68-8.53-3.14-7.41 5.24.34-9.07-7.27-5.44 8.74-2.47 2.91-8.6z"
      />
    </svg>
  );
};
