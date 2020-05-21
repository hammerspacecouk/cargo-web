import * as React from "react";
import { useShipNameGenerator } from "@src/hooks/useShipNameGenerator";
import { IActionToken } from "@src/interfaces";
import styled from "styled-components";
import { SIZES } from "@src/styles/typography";
import { BREAKPOINTS } from "@src/styles/media";

interface IProps {
  offeredShipName?: string;
  offeredShipNameToken?: IActionToken;
}

const Guess = styled.span`
  white-space: pre;
  ${SIZES.D};
  ${BREAKPOINTS.S`
    ${SIZES.B.toString()}
  `}
`;

export const ShipNameGenerator = ({ offeredShipName }: IProps) => {
  const { nameGuess } = useShipNameGenerator(offeredShipName);
  return <Guess>{nameGuess}</Guess>;
};
