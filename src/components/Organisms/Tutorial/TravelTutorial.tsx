import * as React from "react";
import { InlineIcon, TINY_ICON } from "@src/components/Atoms/Icon";
import { Prose } from "@src/components/Atoms/Prose";
import { CreditsIcon } from "@src/components/Icons/CreditsIcon";
import { TutorialPanel } from "@src/components/Molecules/TutorialPanel";

export const TravelTutorial = () => (
  <TutorialPanel>
    <Prose>
      <p>
        With a crate on board you can now set off to a new destination. The Navigation panel shows where you can go from
        here and how long it will take, as well as how much{" "}
        <InlineIcon size={TINY_ICON}>
          <CreditsIcon />
        </InlineIcon>{" "}
        you will earn.
      </p>
      <p>Some journeys are more perilous and require experience or strength before they can be undertaken.</p>
      <p>Choose your first direction to begin departure.</p>
    </Prose>
  </TutorialPanel>
);
