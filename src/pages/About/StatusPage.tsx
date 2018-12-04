import * as React from "react";
import { Environment } from "../../util/Environment";
import AboutLayout from "../../components/Layout/AboutLayout";

export default function StatusPage() {
  return (
    <AboutLayout title="Status">
      <p className="right">
        <a
          href={`${Environment.apiHostname}/status`}
          className="button"
          target="_blank"
        >
          API Status
        </a>
      </p>
      <h2>App</h2>
      <table className="table table--striped">
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
      </table>

      <h2>Request</h2>
      <table className="table table--striped">
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
      </table>
    </AboutLayout>
  );
}
