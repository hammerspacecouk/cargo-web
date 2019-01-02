import { Component, createElement } from "react";
import CheatingPage from "../../pages/About/CheatingPage";
import { withInitialData } from "../withInitialData";

class CheatingComponent extends Component<undefined, undefined> {
  public render() {
    return createElement(CheatingPage);
  }
}

export const Cheating = withInitialData(CheatingComponent);
