import * as React from "react";
import { InlineIcon, TINY_ICON } from "@src/components/Atoms/Icon";
import { Prose } from "@src/components/Atoms/Prose";
import { CreditsIcon } from "@src/components/Icons/CreditsIcon";
import { TutorialPanel } from "@src/components/Molecules/TutorialPanel";

export const LaunchTutorial = () => (
  <TutorialPanel>
    <Prose>
      <p>
        Here you can launch more ships for your fleet. Each ship will have a different strength: speed, cargo capacity,
        auto navigation etc. New ships will be launched at your home port.
      </p>
      <p>
        Don't have enough <CreditSymbol />? Ship some crates to earn more and then come back here.
      </p>
    </Prose>
  </TutorialPanel>
);

const CreditSymbol = () => (
  <InlineIcon size={TINY_ICON}>
    <CreditsIcon />
  </InlineIcon>
);
