import * as React from "react";
import PlayerInterface from "../../DomainInterfaces/PlayerInterface";
import Environment from "../../Infrastructure/Environment/index";

export interface Props {
  player: PlayerInterface;
}

export default ({player}: Props) => {
  return (
    <div
      className="emblem"
    >
      <img src={`${Environment.apiHostname}${player.emblem}`} alt="" />
      {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250"><circle fill={`#${player.colour}`} cx="219.5" cy="128.5" r="80.5"/><path fill={`#${player.colour}`} d="M253.5 48a80.49 80.49 0 0 0-10 .64 80.48 80.48 0 0 1 0 159.72A80.49 80.49 0 1 0 253.5 48z"/></svg>*/}
      {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 250"><path d="M270.68 93.56V207.2h-47.42V93.56h-36.32V47.78h119.94v45.78z" fill={`#${player.colour}`}/></svg>*/}
    </div>
  );
};
