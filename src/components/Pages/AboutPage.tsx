import * as React from "react";
import { AboutLayout } from "../Templates/AboutLayout";
import { routes } from "../../routes";
import { Prose } from "../Atoms/Prose";

export const AboutPage = () => (
  <AboutLayout>
    <Prose>
      <h2>More pages</h2>
      <ul>
        <li>
          <a href={routes.getAboutPolicies()}>Policies</a>
        </li>
        <li>
          <a href={routes.getAboutStatus()}>Application Status</a>
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
