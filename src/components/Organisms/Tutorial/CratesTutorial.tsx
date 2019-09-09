import * as React from "react";
import { InlineIcon, TINY_ICON } from "../../Atoms/Icon";
import { Prose } from "../../Atoms/Prose";
import { CreditsIcon } from "../../Icons/CreditsIcon";
import { TutorialPanel } from "../../Molecules/TutorialPanel";

export const CratesTutorial = () => (
  <TutorialPanel>
    <Prose>
      <p>
        While travelling, shipping crates will earn you <CreditSymbol />, which can be used to purchase more ships and
        tactical abilities. The more light years (ly) you ship a crate, the more <CreditSymbol /> it will earn you.
      </p>
      <p>Below you can find which crates are available to pick up at this port and which you already have on board</p>
      <p>Choose your first crate to begin.</p>
    </Prose>
  </TutorialPanel>
);

const CreditSymbol = () => (
  <InlineIcon size={TINY_ICON}>
    <CreditsIcon />
  </InlineIcon>
);
