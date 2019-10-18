import { Component, createElement } from "react";
import { DeletePage } from "../components/Pages/DeletePage";
import { NextContext } from "next";

export default class extends Component {
  public static async getInitialProps({ query, res }: NextContext) {
    const stage = parseInt((query.stage as string) || "1", 10);
    const token = query.token;

    if (stage < 1 || stage > 3) {
      res.writeHead(400);
      res.end("Invalid stage provided");
      return {};
    }

    return {
      stage,
      token
    };
  }

  public render() {
    return createElement(DeletePage, this.props);
  }
}
