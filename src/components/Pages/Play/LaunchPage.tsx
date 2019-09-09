import * as React from "react";
import Link from "next/link";
import { ShipUpgrades } from "../../Organisms/ShipUpgrades";
import { pageTitle } from "../../../utils/pageTitle";
import Head from "next-server/head";
import { PlayBoardLayout } from "../../Templates/PlayBoardLayout";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { useLaunchShipsContext } from "../../../contexts/LaunchShipsContext/LaunchShipsContext";
import { Modal } from "../../Molecules/Modal";
import { Prose } from "../../Atoms/Prose";
import { routes } from "../../../routes";
import { Button, ConfirmButton } from "../../Atoms/Button";
import { ButtonRow } from "../../Molecules/ButtonRow";

export const LaunchPage = () => {
  const { ships, launchEvent, acknowledgeLaunchEvent } = useLaunchShipsContext();

  let launchModal;
  if (launchEvent) {
    const link = routes.getPlayShip(launchEvent.newShip.id);
    launchModal = (
      <Modal isOpen={true} title="Ship Launched" onClose={acknowledgeLaunchEvent}>
        <Prose>
          <p>
            <em>{launchEvent.newShip.name}</em> was launched at <strong>{launchEvent.atPort.name}</strong>
          </p>
        </Prose>
        <ButtonRow>
          <Link as={link.as} href={link.href}>
            <ConfirmButton as="a" href={link.as}>
              Show me
            </ConfirmButton>
          </Link>{" "}
          <Button onClick={acknowledgeLaunchEvent}>Close</Button>
        </ButtonRow>
      </Modal>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle("Launch ships...")}</title>
      </Head>
      <PlayBoardLayout title="Launch ships">
        <StyledShipUpgrades>
          <ShipUpgrades shipUpgrades={ships} />
        </StyledShipUpgrades>
      </PlayBoardLayout>
      {launchModal}
    </>
  );
};

const StyledShipUpgrades = styled.div`
  padding: ${GRID.UNIT};
`;
