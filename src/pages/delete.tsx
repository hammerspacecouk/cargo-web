import React, { Component } from "react";
import { DeletePage, IDeletePageProps } from "../components/Pages/DeletePage";
import { NextPageContext } from "next";

export default class extends Component<IDeletePageProps> {
  public static async getInitialProps({ query, res }: NextPageContext) {
    const stage = parseInt((query.stage as string) || "1", 10);
    const token = query.token;

    if (stage < 1 || stage > 3) {
      res.writeHead(400);
      res.end("Invalid stage provided");
      return {};
    }

    return {
      stage,
      token,
    };
  }

  public render() {
    return <DeletePage {...this.props} />;
  }
}
