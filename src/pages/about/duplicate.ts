import { Component, createElement } from "react";
import { DuplicatePage } from "../../components/Pages/About/DuplicatePage";

export default class extends Component {
  public render() {
    return createElement(DuplicatePage, this.props);
  }
}
