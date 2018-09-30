import * as React from "react";
import CrumbTitle, { Crumb } from "../../Components/Navigation/CrumbTitle";
import routes from "../../routes";
import AboutLayout from "../../Components/Layout/AboutLayout";

export default class extends React.Component<undefined, undefined> {
  static getCrumb = (): Crumb => ({
    link: routes.getAbout(),
    title: "About Planet Cargo"
  });

  render() {
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
}
