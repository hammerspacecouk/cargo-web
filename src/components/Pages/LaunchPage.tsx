import * as React from "react";
import { ShipUpgrades } from "../Organisms/ShipUpgrades";
import { pageTitle } from "../../utils/pageTitle";
import Head from "next-server/head";

export const LaunchPage = ({ ships }: IProps) => {
  return (
    <>
      <Head>
        <title>{pageTitle("Launch ships...")}</title>
      </Head>
      <ShipUpgrades shipUpgrades={ships} />
    </>
  );
};

interface IProps {
  ships: any[];
}
