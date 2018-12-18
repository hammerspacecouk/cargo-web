import * as React from "react";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { CrateAtPort } from "./CrateAtPort";
import { Loading } from "../../../components/Atoms/Loading/Loading";
import styled from "styled-components";
import { ListInline } from "../../../components/Atoms/Lists/ListInline/ListInline";
import { Hidden } from "../../../components/Atoms/Hidden/Hidden";

interface PropsInterface {
  className?: string;
}

const List = styled(ListInline)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CratesAtPort = ({ className }: PropsInterface) => {
  const { cratesInPort } = useCurrentShipContext();

  if (cratesInPort === undefined) {
    return <Loading />;
  } // todo - pretty loader

  return (
    <div className={className}>
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
