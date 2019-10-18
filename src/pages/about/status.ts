import { Component, createElement } from "react";
import { StatusPage } from "../../components/Pages/About/StatusPage";

export default class extends Component {
  public render() {
    return createElement(StatusPage, this.props);
  }
}
