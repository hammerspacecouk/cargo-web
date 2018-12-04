import { Component, createElement } from "react";
import withInitialData from "./withInitialData";

import AboutPage from "../pages/AboutPage";
import CheatingPage from "../pages/About/CheatingPage";
import DuplicatePage from "../pages/About/DuplicatePage";
import PoliciesPage from "../pages/About/PoliciesPage";
import StatusPage from "../pages/About/StatusPage";

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

export default withInitialData(AboutIndex);
export const Cheating = withInitialData(CheatingComponent);
export const Duplicate = withInitialData(DuplicateComponent);
export const Policies = withInitialData(PoliciesComponent);
export const Status = withInitialData(StatusComponent);
