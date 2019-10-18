import { Component, createElement } from "react";
import { AboutPage } from "../components/Pages/AboutPage";

export default class extends Component {
  public render() {
    return createElement(AboutPage, this.props);
  }
}
