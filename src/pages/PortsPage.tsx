import * as React from "react";
import routes from "../routes";
import PortInterface from "../interfaces/PortInterface";
import CrumbTitle from "../components/Navigation/CrumbTitle";

interface PropsInterface {
  ports?: PortInterface[];
}

export default function PortsPage({ ports }: PropsInterface) {
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
    <div className="t-doc">
      <div className="t-doc__title">
        <CrumbTitle>Ports</CrumbTitle>
      </div>
      <div className="t-doc__main">{portsList}</div>
    </div>
  );
}
