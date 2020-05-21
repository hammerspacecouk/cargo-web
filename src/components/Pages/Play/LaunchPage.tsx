import * as React from "react";
import { ShipUpgrades } from "@src/components/Organisms/ShipUpgrades";
import { pageTitle } from "@src/utils/pageTitle";
import Head from "next/head";
import { IShipUpgrade } from "@src/interfaces";
import { PanelPage } from "@src/components/Templates/PanelPage";

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
