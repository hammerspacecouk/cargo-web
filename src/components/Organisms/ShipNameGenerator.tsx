import * as React from "react";
import { useShipNameGenerator } from "../../hooks/useShipNameGenerator";
import { IActionToken } from "../../interfaces";
import styled from "styled-components";
import { SIZES } from "../../styles/typography";
import { BREAKPOINTS } from "../../styles/media";

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
