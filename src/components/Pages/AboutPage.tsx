import * as React from "react";
import { AboutLayout } from "../Templates/AboutLayout";
import { routes } from "../../routes";

export const AboutPage = () => (
  <AboutLayout>
    <p>More stuff. Twitter etc</p>

    <h2>More pages</h2>
    <ul>
      <li>
        <a href={routes.getAboutPolicies()}>Policies</a>
      </li>
      <li>
        <a href={routes.getAboutStatus()}>Application Status</a>
      </li>
      <li>
        <a href="/todo">Styleguide</a>
      </li>
    </ul>

    <p>Planet textures from https://www.solarsystemscope.com</p>
    <p>Shuttle model from https://sketchfab.com/3d-models/space-shuttle-ff4b00b7ebb24fdd98fb96b08f2c43c9</p>
    <p>Probe model from https://sketchfab.com/3d-models/pioneer-3d-printable-22a3f655baeb42d8b7a3efd38d7bb09c</p>
  </AboutLayout>
);
