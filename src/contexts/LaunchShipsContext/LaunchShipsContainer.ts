import { Component, createElement } from "react";
import { LaunchShipsContextComponent } from "./LaunchShipsContext";
import { IPageWithData, IShipUpgrade } from "../../interfaces";
import { getAvailableShips } from "../../data/launch-ships";
import { NextPageContext } from "next";

export const LaunchShipsContainer = (Page: IPageWithData) => {
  return class extends Component<IProps, undefined> {
    public static async getInitialProps({req, res}: NextPageContext) {
      const data = await getAvailableShips(req, res);
      return {
        ships: data.ships
      }
    }

    public render() {
      return createElement(
        LaunchShipsContextComponent,
        {
          initialShipsData: this.props.ships,
        },
        createElement(Page)
      );
    }
  };
};

interface IProps {
  ships?: IShipUpgrade[];
}
