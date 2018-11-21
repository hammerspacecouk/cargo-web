import * as React from "react";
import styled from "styled-components";
import { grid } from "../../../GlobalStyle";
import ItemButton from "../../Atoms/ItemButton/ItemButton";
import ScoreValue from "../ScoreValue/ScoreValue";

interface PropsInterface {
  icon: JSX.Element;
  cost: number;
  handler: any; // preferably not
}

const Icon = styled.div`
    width: 80%;
    margin: 0 auto ${grid.unit / 4}px;
`;
const Value = styled.div`
    text-align: center;
`;

// todo - needs animation check to see if you can still afford it
export default function PurchaseItemButton({icon, cost, handler}: PropsInterface) {
  return (
    <ItemButton onClick={handler}>
      <Icon>{icon}</Icon>
      <Value><ScoreValue score={cost.toString()}/></Value>
    </ItemButton>
  )
}
