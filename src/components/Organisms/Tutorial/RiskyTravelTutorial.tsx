import * as React from "react";
import { InlineIcon, TINY_ICON } from "@src/components/Atoms/Icon";
import { Prose } from "@src/components/Atoms/Prose";
import { CreditsIcon } from "@src/components/Icons/CreditsIcon";
import { TutorialPanel } from "@src/components/Molecules/TutorialPanel";

export const RiskyTravelTutorial = () => (
  <TutorialPanel>
    <Prose>
      <p>The Reticulum Shuttle is the only ship that can complete the mission.</p>
      <p>
        Stick to Safe Zones to earn experience and{" "}
        <InlineIcon size={TINY_ICON}>
          <CreditsIcon />
        </InlineIcon>{" "}
        until you can purchase a new ship.
      </p>
    </Prose>
  </TutorialPanel>
);
