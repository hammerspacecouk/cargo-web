import * as React from "react";
import { AboutLayout } from "../components/Templates/AboutLayout/AboutLayout";
import { routes } from "../routes";

export default function AboutPage() {
  return (
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
    </AboutLayout>
  );
}
