import { Component, createElement } from "react";
import { StatusPage } from "../../pages/About/StatusPage";
import { withInitialData } from "../withInitialData";

class StatusComponent extends Component<undefined, undefined> {
  public render() {
    return createElement(StatusPage);
  }
}

export const Status = withInitialData(StatusComponent);
