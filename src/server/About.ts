import { withInitialData } from "./withInitialData";
import { Component, createElement } from "react";
import AboutPage from "../pages/AboutPage";

class AboutIndex extends Component<undefined, undefined> {
  public render() {
    return createElement(AboutPage);
  }
}

export const About = withInitialData(AboutIndex);
