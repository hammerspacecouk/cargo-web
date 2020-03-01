import * as React from "react";
import { ShipUpgrades } from "../../Organisms/ShipUpgrades";
import { pageTitle } from "../../../utils/pageTitle";
import Head from "next/head";
import { IShipUpgrade } from "../../../interfaces";
import { PanelPage } from "../../Templates/PanelPage";

export interface ILaunchPageProps {
  shipUpgrades: IShipUpgrade[];
}

export const LaunchPage = ({ shipUpgrades }: ILaunchPageProps) => {
  return (
    <>
      <Head>
        <title>{pageTitle("Launch Ships...")}</title>
      </Head>
      <PanelPage title="Launch Ships">
        <ShipUpgrades shipUpgrades={shipUpgrades} />
      </PanelPage>
    </>
  );
};
