import * as React from "react";
import { AboutLayout } from "@src/components/Templates/AboutLayout";
import { routes } from "@src/routes";
import { Prose } from "@src/components/Atoms/Prose";
import {H2} from "@src/components/Atoms/Heading";

export const AboutPage = () => (
  <AboutLayout>
    <Prose>
      <H2>Contact</H2>
      <p>You may e-mail contact@saxopholis.com with any queries. Please note relies may take some time.</p>

      <H2>More pages</H2>
      <ul>
        <li>
          <a href={routes.getAboutPolicies()}>Policies</a>
        </li>
        <li>
          <a href={routes.getAboutTerms()}>Terms & Conditions </a>
        </li>
      </ul>

      <p>
        Planet textures from{" "}
        <a href="https://www.solarsystemscope.com" target="_blank" rel="noreferrer noopener">
          https://www.solarsystemscope.com
        </a>
      </p>
      <p>
        Shuttle model from{" "}
        <a
          href="https://sketchfab.com/3d-models/space-shuttle-ff4b00b7ebb24fdd98fb96b08f2c43c9"
          target="_blank"
          rel="noreferrer noopener"
        >
          https://sketchfab.com/3d-models/space-shuttle-ff4b00b7ebb24fdd98fb96b08f2c43c9
        </a>
      </p>
      <p>
        Probe model from{" "}
        <a
          href="https://sketchfab.com/3d-models/pioneer-3d-printable-22a3f655baeb42d8b7a3efd38d7bb09c"
          target="_blank"
          rel="noreferrer noopener"
        >
          https://sketchfab.com/3d-models/pioneer-3d-printable-22a3f655baeb42d8b7a3efd38d7bb09c
        </a>
      </p>
    </Prose>
  </AboutLayout>
);
