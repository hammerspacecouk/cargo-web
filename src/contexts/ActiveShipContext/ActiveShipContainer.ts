import { Component, createElement } from "react";
import { NextContext } from "next";
import { ActiveShipContextComponent } from "./ActiveShipContext";
import { IPageWithData } from "../../interfaces";
import { getShipData, IActiveShipResponse } from "../../data/active-ship";

export const ActiveShipContainer = (Page: IPageWithData) => {
  return class extends Component<IProps, undefined> {
    public static async getInitialProps({ query, req }: NextContext) {
      const shipData = await getShipData(query.shipId as string, req && req.headers);
      return {
        shipId: query.shipId,
        shipData
      };
    }

    public render() {
      return createElement(
        ActiveShipContextComponent,
        {
          shipId: this.props.shipId,
          initialShipData: this.props.shipData
        },
        createElement(Page)
      );
    }
  };
};

interface IProps {
  shipId: string;
  shipData?: IActiveShipResponse;
}
