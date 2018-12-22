import * as React from "react";
import styled from "styled-components";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { CrateAtPort } from "./CrateAtPort";
import { Loading } from "../../../components/Atoms/Loading/Loading";
import { ListInline } from "../../../components/Atoms/Lists/ListInline/ListInline";
import { Hidden } from "../../../components/Atoms/Hidden/Hidden";
import { H1 } from "../../../components/Atoms/Heading/Heading";
import Icon from "../../../components/Atoms/Icon/Icon";
import ShieldIcon from "../../../components/Icons/ShieldIcon/ShieldIcon";
import { TextCenter } from "../../../components/Atoms/Text/Text";

interface PropsInterface {
  className?: string;
}

const List = styled(ListInline)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CratesAtPort = ({ className }: PropsInterface) => {
  const { port, cratesInPort } = useCurrentShipContext();

  if (cratesInPort === undefined) {
    return <Loading />;
  } // todo - pretty loader

  // todo - abstract
  let safe = null;
  if (port.safeHaven) {
    safe = (
      <abbr title="Safe Haven">
        <Icon>
          <ShieldIcon />
        </Icon>
      </abbr>
    );
  }

  return (
    <div className={className}>
      <H1 as="p">
        <TextCenter>
        {port.name} {safe}
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
