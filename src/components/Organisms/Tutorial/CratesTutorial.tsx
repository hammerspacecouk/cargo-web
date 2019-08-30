import * as React from "react";
import styled from "styled-components";
import { Icon, InlineIcon, TINY_ICON } from "../../Atoms/Icon";
import { ChevronUpIcon } from "../../Icons/ChevronUpIcon";
import { GRID } from "../../../styles/variables";
import { Prose } from "../../Atoms/Prose";
import { CreditsIcon } from "../../Icons/CreditsIcon";
import { BREAKPOINTS } from "../../../styles/media";

export const CratesTutorial = () => (
  <Layout>
    <Pointer>
      <Icon><ChevronUpIcon/></Icon>
    </Pointer>
    <Text>
      <Prose>
        <p>
          While travelling, shipping crates will earn you <CreditSymbol />, which can be
          used to purchase more ships and tactical abilities. The more light years (ly) you ship a crate,
          the more <CreditSymbol /> it will earn you.
        </p>
        <p>The Cargo panel shows the crates available to pick up at this port and which you already have on board</p>
        <p>Choose your first crate to begin.</p>
      </Prose>
    </Text>
  </Layout>
);

const CreditSymbol = () => <InlineIcon size={TINY_ICON}><CreditsIcon/></InlineIcon>;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  ${BREAKPOINTS.L`
    flex-direction: row;
  `}
`;

const Pointer = styled.div`
  align-self: center;
  margin-bottom: ${GRID.UNIT};
  ${BREAKPOINTS.L`
    margin: 0 ${GRID.UNIT} 0 0;
    transform: rotate(-90deg);
  `}
`;

const Text = styled.div`
  flex: 1;
`;
