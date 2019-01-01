import * as React from "react";
import { ActionTokenInterface } from "../../Interfaces";
import { useShipNameGenerator } from "../../hooks/useShipNameGenerator";
import { TextB } from "../../components/Atoms/Text/Text";

interface PropsInterface {
  offeredShipName?: string;
  offeredShipNameToken?: ActionTokenInterface;
}

export const ShipNameGenerator = ({ offeredShipName }: PropsInterface) => {
  const { nameGuess } = useShipNameGenerator(offeredShipName);
  return <TextB>{nameGuess}</TextB>;
};
