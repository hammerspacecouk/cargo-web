import * as React from "react";
import {NotFound} from "../../components/Organisms/Error/NotFound";
import CrumbTitle from "../../components/Navigation/CrumbTitle";
import PortInterface from "../../interfaces/PortInterface";

interface PropsInterface {
  port?: PortInterface;
}

export default function PortPage({ port }: PropsInterface) {
  if (!port) {
    return <NotFound message="You need a new map. There is no port here" />;
  }

  return (
    <div className="t-doc">
      <div className="t-doc__title">
        <CrumbTitle crumbs={[{ link: "/ports", title: "Ports" }]}>
          {port.name}
        </CrumbTitle>
      </div>
      <div className="t-doc__main">
        <p>{port.id}</p>
      </div>
    </div>
  );
}
