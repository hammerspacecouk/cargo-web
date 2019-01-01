import * as React from "react";
import { NotFound } from "../../components/Organisms/Error/NotFound";
import { PortInterface } from "../../Interfaces";
import { SimplePage } from "../../components/Templates/SimplePage/SimplePage";

interface PropsInterface {
  port?: PortInterface;
}

export const PortPage = ({ port }: PropsInterface) => {
  if (!port) {
    return <NotFound message="You need a new map. There is no port here"/>;
  }

  return (
    <SimplePage title={port.name} crumbs={[{ link: "/ports", title: "Ports" }]}>
      <p>{port.id}</p>
    </SimplePage>
  );
};
