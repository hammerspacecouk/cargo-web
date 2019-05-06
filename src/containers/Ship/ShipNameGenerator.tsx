import * as React from "react";
import { TextB } from "../../components/Atoms/Text/Text";
import { useShipNameGenerator } from "../../hooks/useShipNameGenerator";
import { IActionToken } from "../../Interfaces";
import styled from "styled-components";
import { SIZES } from "../../styles/typography";
import { BREAKPOINTS } from "../../styles/media";

interface IProps {
  offeredShipName?: string;
  offeredShipNameToken?: IActionToken;
}

const Guess = styled.span`
  ${SIZES.D};
  ${BREAKPOINTS.S`
    ${SIZES.B}
  `}
`;

export const ShipNameGenerator = ({ offeredShipName }: IProps) => {
  const { nameGuess } = useShipNameGenerator(offeredShipName);
  return <Guess>{nameGuess}</Guess>;
};
