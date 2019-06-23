import { Component, createElement } from "react";
import { PoliciesPage } from "../../src/components/Pages/About/PoliciesPage";

export default class extends Component {
  public render() {
    return createElement(PoliciesPage, this.props);
  }
}
