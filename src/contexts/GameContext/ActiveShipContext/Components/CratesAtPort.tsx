import * as React from "react";
import styled from "styled-components";
import { H1 } from "../../../../components/Atoms/Heading/Heading";
import { Hidden } from "../../../../components/Atoms/Hidden/Hidden";
import { ListInline } from "../../../../components/Atoms/Lists/ListInline/ListInline";
import { Loading } from "../../../../components/Atoms/Loading/Loading";
import { TextCenter } from "../../../../components/Atoms/Text/Text";
import { PortName } from "../../../../components/Molecules/PortName/PortName";
import { CrateAtPort } from "../../../../pages/Play/Port/CrateAtPort";
import { useActiveShipContext } from "../ActiveShipContext";

interface IProps {
  className?: string;
}

const List = styled(ListInline)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CratesAtPort = ({ className }: IProps) => {
  const { cratesInPort } = useActiveShipContext();

  if (cratesInPort === undefined) {
    return <Loading />;
  } // todo - pretty loader

  return (
    <div className={className}>
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
