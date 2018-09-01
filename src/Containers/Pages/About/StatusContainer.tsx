import * as React from "react";
import Environment from "../../../Data/Environment";
import CrumbTitle from "../../../Components/CrumbTitle";

class StatusContainer extends React.Component<undefined, undefined> {
  render() {
    return (
      <div className="t-doc">
        <div className="t-doc__title">
          <CrumbTitle
            crumbs={[{ link: "/about", title: "About Planet Cargo" }]}
          >
            Status
          </CrumbTitle>
        </div>
        <div className="t-doc__main">
          <p className="right">
            <a
              href={`${Environment.apiHostname}/status`}
              className="btn"
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
        </div>
      </div>
    );
  }
}

export default StatusContainer;
