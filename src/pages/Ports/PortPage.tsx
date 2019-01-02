import * as React from "react";
import { NotFound } from "../../components/Organisms/Error/NotFound";
import { SimplePage } from "../../components/Templates/SimplePage/SimplePage";
import { IPort } from "../../Interfaces";

interface IProps {
  port?: IPort;
}

export const PortPage = ({ port }: IProps) => {
  if (!port) {
    return <NotFound message="You need a new map. There is no port here" />;
  }

  return (
    <SimplePage title={port.name} crumbs={[{ link: "/ports", title: "Ports" }]}>
      <p>{port.id}</p>
    </SimplePage>
  );
};
