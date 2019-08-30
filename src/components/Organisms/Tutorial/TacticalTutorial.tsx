import * as React from "react";
import styled from "styled-components";
import { Icon, InlineIcon, TINY_ICON } from "../../Atoms/Icon";
import { GRID } from "../../../styles/variables";
import { Prose } from "../../Atoms/Prose";
import { BREAKPOINTS } from "../../../styles/media";
import { ChevronDownIcon } from "../../Icons/ChevronDownIcon";
import { CreditsIcon } from "../../Icons/CreditsIcon";

export const TacticalTutorial = () => (
  <Layout>
    <Text>
      <Prose>
        <p>
          When you arrive at a space port you have the opportunity to use <CreditSymbol /> to purchase tactical
          enhancements to help with your journey.</p>
        <p>These might be:</p>
        <ul>
          <li><strong>Travel enhancements</strong>: Speed up journeys or earn more <CreditSymbol /> </li>
          <li><strong>Defensive technology</strong>: Protect yourself against the dangers out there</li>
          <li><strong>Offensive technology</strong>: For eliminating the competition</li>
        </ul>
        <p>
          Not all enhancements are available in all space ports and prices will vary.
          The tactical panel shows what you can purchase here, and lets you use what you have purchased.
        </p>
        <p>
          Don't have enough <CreditSymbol /> yet? Ship a crate to the next planet to earn some more.
        </p>
      </Prose>
    </Text>
    <Pointer>
      <Icon><ChevronDownIcon /></Icon>
    </Pointer>
  </Layout>
);

const CreditSymbol = () => <InlineIcon size={TINY_ICON}><CreditsIcon/></InlineIcon>;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  ${BREAKPOINTS.MAX`
    flex-direction: row;
  `}
`;

const Pointer = styled.div`
  align-self: center;
  margin-top: ${GRID.UNIT};
  ${BREAKPOINTS.MAX`
    margin: 0 0 0 ${GRID.UNIT};
    transform: rotate(-90deg);
  `}
`;

const Text = styled.div`
  flex: 1;
`;
