import * as React from "react";
import routes from "../routes";
import { PortInterface } from "../Interfaces";
import { SimplePage } from "../components/Templates/SimplePage/SimplePage";

interface PropsInterface {
  ports?: PortInterface[];
}

export const PortsPage = ({ ports }: PropsInterface) => {
  const portsList = (
    <ul>
      {ports.map((port: PortInterface, index: number) => {
        return (
          <li key={index}>
            <a href={routes.getPortShow(port.id)}>{port.name}</a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <SimplePage title="Ports">
      {portsList}
    </SimplePage>
  );
};
