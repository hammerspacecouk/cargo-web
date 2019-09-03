import * as React from "react";
import { InlineIcon, TINY_ICON } from "../../Atoms/Icon";
import { Prose } from "../../Atoms/Prose";
import { CreditsIcon } from "../../Icons/CreditsIcon";
import { TutorialPanel } from "../../Molecules/TutorialPanel";

export const TacticalTutorial = () => (
  <TutorialPanel>
    <Prose>
      <p>
        When you arrive at a space port you have the opportunity to use <CreditSymbol/> to purchase tactical
        enhancements to help with your journey.</p>
      <p>These might be:</p>
      <ul>
        <li><strong>Travel enhancements</strong>: Speed up journeys or earn more <CreditSymbol/></li>
        <li><strong>Defensive technology</strong>: Protect yourself against the dangers out there</li>
        <li><strong>Offensive technology</strong>: For eliminating the competition</li>
      </ul>
      <p>
        Not all enhancements are available in all space ports and prices will vary.
        The tactical panel shows what you can purchase here, and lets you use what you have purchased.
      </p>
      <p>
        Don't have enough <CreditSymbol/> yet? Ship a crate to the next planet to earn some more.
      </p>
    </Prose>
  </TutorialPanel>
);

const CreditSymbol = () => <InlineIcon size={TINY_ICON}><CreditsIcon/></InlineIcon>;
