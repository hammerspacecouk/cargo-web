import { Component, createElement } from "react";
import { DuplicatePage } from "../../src/components/Pages/About/DuplicatePage";

export default class extends Component {
  public render() {
    return createElement(DuplicatePage, this.props);
  }
}
