import * as React from "react";
import { TextB } from "../../components/Atoms/Text/Text";
import { useShipNameGenerator } from "../../hooks/useShipNameGenerator";
import { IActionToken } from "../../Interfaces";

interface IProps {
  offeredShipName?: string;
  offeredShipNameToken?: IActionToken;
}

export const ShipNameGenerator = ({ offeredShipName }: IProps) => {
  const { nameGuess } = useShipNameGenerator(offeredShipName);
  return <TextB>{nameGuess}</TextB>;
};
