import * as React from "react";
import { Prose } from "@src/components/Atoms/Prose";
import { TutorialPanel } from "@src/components/Molecules/TutorialPanel";

export const NeedsConvoyTutorial = () => (
  <TutorialPanel>
    <Prose>
      <p>
        Some routes are too dangerous to go alone. You'll need to build a convoy. Bring another ship here to set one up.
      </p>
    </Prose>
  </TutorialPanel>
);
