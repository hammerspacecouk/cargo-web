import * as React from "react";

import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import { useShipNameGenerator } from "../../hooks/useShipNameGenerator";
import styled from "styled-components";

interface PropsInterface {
  offeredShipName?: string;
  offeredShipNameToken?: ActionTokenInterface;
}

const Text = styled.span`
    font-size: 2.35rem;
`; // todo - standardise typography sizes everywhere

export default ({offeredShipName}: PropsInterface) => {

  const {nameGuess} = useShipNameGenerator(offeredShipName);

  return (
    <Text>{nameGuess}</Text>
  );
};
