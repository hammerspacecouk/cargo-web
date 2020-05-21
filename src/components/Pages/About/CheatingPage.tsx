import * as React from "react";
import { AboutLayout } from "@src/components/Templates/AboutLayout";
import { Prose } from "@src/components/Atoms/Prose";

export const CheatingPage = () => (
  <AboutLayout title="Cheating">
    <Prose>
      <p>
        <strong>Not cool dawg</strong>. How did you end up here? You tried to do something you weren't allowed to do is
        how.
      </p>
      <p>
        <strong>Innocent?</strong> Perhaps you had the game open in multiple tabs and the state became out of sync. Try
        to play in just the one tab.
      </p>
      <p>
        With your wrist now suitability slapped, you may <a href="/play">return to the game</a>
      </p>
    </Prose>
  </AboutLayout>
);
