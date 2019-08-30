import * as React from "react";
import { Button } from "../../Atoms/Button";
import { TableStriped } from "../../Molecules/Table";
import { AboutLayout } from "../../Templates/AboutLayout";
import { Environment } from "../../../utils/environment";

export const StatusPage = () => (
  <AboutLayout title="Status">
    <p className="right">
      <Button as="a" href={`${Environment.clientApiHostname}/status`} target="_blank">
        API Status
      </Button>
    </p>
    <h2>App</h2>
    <TableStriped>
      <tbody>
        <tr>
          <th>Version</th>
          <td>{Environment.appVersion}</td>
        </tr>
        <tr>
          <th>Client API Hostname</th>
          <td>{Environment.clientApiHostname}</td>
        </tr>
      </tbody>
    </TableStriped>

    <h2>Request</h2>
    <TableStriped>
      <tbody>
        <tr>
          <th>Server Rendered</th>
          <td>{Environment.isServer ? "yes" : "no"}</td>
        </tr>
        <tr>
          <th>Client Rendered</th>
          <td>{Environment.isClient ? "yes" : "no"}</td>
        </tr>
      </tbody>
    </TableStriped>
  </AboutLayout>
);
