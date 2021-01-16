import * as React from "react";
import { Prose } from "@src/components/Atoms/Prose";
import { TutorialPanel } from "@src/components/Molecules/TutorialPanel";

export const TacticalTutorial = () => (
  <TutorialPanel>
    <Prose>
      <p>The tactical panel show items in your inventory. These can help with:</p>
      <ul>
        <li>
          <strong>Travel</strong>
          <br />
          Speed up those particularly long journeys or earn more shipping crates.
        </li>
        <li>
          <strong>Offence</strong>
          <br />
          Make it more difficult for others to get to the goal before you.
        </li>
        <li>
          <strong>Defence</strong>
          <br />
          Protect yourself from those who seek to harm you.
        </li>
      </ul>
      <p>Each planet also has a trading post to purchase more. Venture to dangerous places for better prices.</p>
      <p>Here you can also create your first convoy, increasing your strength.</p>
    </Prose>
  </TutorialPanel>
);
