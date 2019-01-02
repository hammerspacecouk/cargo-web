import { withInitialData } from "../withInitialData";
import { Component, createElement } from "react";
import DuplicatePage from "../../pages/About/DuplicatePage";

class DuplicateComponent extends Component<undefined, undefined> {
  public render() {
    return createElement(DuplicatePage);
  }
}

export const Duplicate = withInitialData(DuplicateComponent);
