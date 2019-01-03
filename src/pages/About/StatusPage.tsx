import * as React from "react";
import { Button } from "../../components/Atoms/Button/Button";
import { TableStriped } from "../../components/Molecules/Table/Table";
import { AboutLayout } from "../../components/Templates/AboutLayout/AboutLayout";
import { Environment } from "../../util/Environment";

export const StatusPage = () => (
  <AboutLayout title="Status">
    <p className="right">
      <Button as="a" href={`${Environment.apiHostname}/status`} target="_blank">
        API Status
      </Button>
    </p>
    <h2>App</h2>
    <TableStriped>
      <tbody>
        <tr>
          <th>Environment</th>
          <td>{Environment.appEnv}</td>
        </tr>
        <tr>
          <th>Version</th>
          <td>{Environment.appVersion}</td>
        </tr>
        <tr>
          <th>API Hostname</th>
          <td>{Environment.apiHostname}</td>
        </tr>
        <tr>
          <th>NODE_ENV</th>
          <td>{Environment.nodeEnv}</td>
        </tr>
      </tbody>
    </TableStriped>

    <h2>Request</h2>
    <TableStriped>
      <tbody>
        <tr>
          <th>Host</th>
          <td>{Environment.host}</td>
        </tr>
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
