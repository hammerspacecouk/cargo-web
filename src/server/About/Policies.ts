import { Component, createElement } from "react";
import { PoliciesPage } from "../../pages/About/PoliciesPage";
import { withInitialData } from "../withInitialData";

class PoliciesComponent extends Component<undefined, undefined> {
  public render() {
    return createElement(PoliciesPage);
  }
}

export const Policies = withInitialData(PoliciesComponent);
