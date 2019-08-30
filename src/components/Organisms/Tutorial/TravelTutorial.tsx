import * as React from "react";
import styled from "styled-components";
import { Icon, InlineIcon, TINY_ICON } from "../../Atoms/Icon";
import { GRID } from "../../../styles/variables";
import { Prose } from "../../Atoms/Prose";
import { BREAKPOINTS } from "../../../styles/media";
import { ChevronDownIcon } from "../../Icons/ChevronDownIcon";
import { CreditsIcon } from "../../Icons/CreditsIcon";

export const TravelTutorial = () => (
  <Layout>
    <Text>
      <Prose>
        <p>
          With a crate on board you can now set off to a new destination. The Navigation panel shows where you
          can go from here and how long it will take,
          as well as how much <InlineIcon size={TINY_ICON}><CreditsIcon/></InlineIcon> you will earn.
        </p>
        <p>
          Some journeys are more perilous and require experience or strength before they can be undertaken.
        </p>
        <p>Choose your first direction to begin departure.</p>
        <p><em>Tip: Remember your route to find your way back</em></p>
      </Prose>
    </Text>
    <Pointer>
      <Icon><ChevronDownIcon /></Icon>
    </Pointer>
  </Layout>
);

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  ${BREAKPOINTS.L`
    flex-direction: row;
  `}
`;

const Pointer = styled.div`
  align-self: center;
  margin-top: ${GRID.UNIT};
  ${BREAKPOINTS.L`
    margin: 0 0 0 ${GRID.UNIT};
    transform: rotate(-90deg);
  `}
`;

const Text = styled.div`
  flex: 1;
`;
