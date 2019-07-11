import * as React from "react";
import { ShipUpgrades } from "../Organisms/ShipUpgrades";
import { pageTitle } from "../../utils/pageTitle";
import Head from "next-server/head";
import { PlayBoardLayout } from "../Templates/PlayBoardLayout";
import styled from "styled-components";
import { GRID } from "../../styles/variables";

export const LaunchPage = ({ ships }: IProps) => {
  return (
    <>
      <Head>
        <title>{pageTitle("Launch ships...")}</title>
      </Head>
      <PlayBoardLayout title="Launch ships">
        <StyledShipUpgrades shipUpgrades={ships} />
      </PlayBoardLayout>
    </>
  );
};

interface IProps {
  ships: any[];
}

const StyledShipUpgrades = styled(ShipUpgrades)`
    padding: ${GRID.UNIT};
`;
