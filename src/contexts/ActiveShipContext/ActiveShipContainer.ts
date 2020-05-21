import { Component, createElement } from "react";
import { NextPageContext } from "next";
import { ActiveShipContextComponent } from "./ActiveShipContext";
import { getShipData, IActiveShipResponse } from "@src/data/active-ship";

export const ActiveShipContainer = (Page: any) =>
  class extends Component<IProps, undefined> {
    public static async getInitialProps({ query, req, res }: NextPageContext) {
      const shipData = await getShipData(query.ship as string, req, res);
      return {
        shipId: query.ship,
        shipData,
      };
    }

    public render() {
      return createElement(
        ActiveShipContextComponent,
        {
          shipId: this.props.shipId,
          initialShipData: this.props.shipData,
        },
        createElement(Page)
      );
    }
  };

interface IProps {
  shipId: string;
  shipData?: IActiveShipResponse;
}
