import {Component, createElement} from "react";
import withInitialData from "./withInitialData";

import AboutPage from "../components/Pages/AboutPage";
import CheatingPage from "../components/Pages/About/CheatingPage";
import DuplicatePage from "../components/Pages/About/DuplicatePage";
import PoliciesPage from "../components/Pages/About/PoliciesPage";
import StatusPage from "../components/Pages/About/StatusPage";
import StyleGuidePage from "../components/Pages/About/StyleGuidePage";


class AboutIndex extends Component<undefined, undefined> {
  render() {
    return createElement(AboutPage);
  }
}

class CheatingComponent extends Component<undefined, undefined> {
  render() {
    return createElement(CheatingPage);
  }
}

class DuplicateComponent extends Component<undefined, undefined> {
  render() {
    return createElement(DuplicatePage);
  }
}

class PoliciesComponent extends Component<undefined, undefined> {
  render() {
    return createElement(PoliciesPage);
  }
}

class StatusComponent extends Component<undefined, undefined> {
  render() {
    return createElement(StatusPage);
  }
}

class StyleGuideComponent extends Component<undefined, undefined> {
  render() {
    return createElement(StyleGuidePage);
  }
}

export default withInitialData(AboutIndex);
export const Cheating = withInitialData(CheatingComponent);
export const Duplicate = withInitialData(DuplicateComponent);
export const Policies = withInitialData(PoliciesComponent);
export const Status = withInitialData(StatusComponent);
export const StyleGuide = withInitialData(StyleGuideComponent);
