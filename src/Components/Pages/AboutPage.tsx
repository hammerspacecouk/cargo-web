import * as React from "react";
import routes from "../../routes";
import AboutLayout from "../../components/Layout/AboutLayout";

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
          <a href={routes.getAboutStyleGuide()}>Styleguide</a>
        </li>
      </ul>
    </AboutLayout>
  );
}
