import * as React from "react";
import { SimplePage } from "../components/Templates/SimplePage/SimplePage";
import { IPort } from "../Interfaces";
import { routes } from "../routes";

interface IProps {
  ports?: IPort[];
}

export const PortsPage = ({ ports }: IProps) => {
  const portsList = (
    <ul>
      {ports.map((port: IPort, index: number) => {
        return (
          <li key={index}>
            <a href={routes.getPortShow(port.id)}>{port.name}</a>
          </li>
        );
      })}
    </ul>
  );

  return <SimplePage title="Ports">{portsList}</SimplePage>;
};
