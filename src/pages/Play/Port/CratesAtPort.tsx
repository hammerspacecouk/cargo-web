import * as React from "react";
import styled from "styled-components";
import { H1 } from "../../../components/Atoms/Heading/Heading";
import { Hidden } from "../../../components/Atoms/Hidden/Hidden";
import { ListInline } from "../../../components/Atoms/Lists/ListInline/ListInline";
import { Loading } from "../../../components/Atoms/Loading/Loading";
import { TextCenter } from "../../../components/Atoms/Text/Text";
import { PortName } from "../../../components/Molecules/PortName/PortName";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { CrateAtPort } from "./CrateAtPort";

interface IProps {
  className?: string;
}

const List = styled(ListInline)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CratesAtPort = ({ className }: IProps) => {
  const { port, cratesInPort } = useCurrentShipContext();

  if (cratesInPort === undefined) {
    return <Loading />;
  } // todo - pretty loader

  return (
    <div className={className}>
      <H1 as="div">
        <TextCenter>
          <PortName port={port} />
        </TextCenter>
      </H1>
      <Hidden as="h2">Crates at Port</Hidden>
      <List>
        {cratesInPort.map(crateAction => (
          <li key={`cap-${crateAction.crate.id}`}>
            <CrateAtPort crateAction={crateAction} />
          </li>
        ))}
      </List>
    </div>
  );
};