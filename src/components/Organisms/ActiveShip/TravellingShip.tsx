import React from "react";
import { IChannel, IClassNameProps, IShip } from "@src/interfaces";
import { useAnimationScene } from "@src/hooks/useAnimationScene";
import { TravellingShipScene } from "@src/animation/scene/TravellingShipScene";

export const TravellingShip = ({ ship, channel, className }: IProps) => {
  const shipCanvasRef = useAnimationScene<HTMLDivElement>(new TravellingShipScene(ship.shipClass, channel), [ship.id]);
  return <div className={className} ref={shipCanvasRef} />;
};

interface IProps extends IClassNameProps {
  ship: IShip;
  channel: IChannel;
}
