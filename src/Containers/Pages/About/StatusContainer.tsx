import * as React from 'react';
import { connect } from 'react-redux';

import {ReactElement} from "react";
import {StateInterface} from "../../../State";
import {EnvironmentStateInterface} from "../../../State/Environment";

interface Props {
    environment?: EnvironmentStateInterface;
}

class Container extends React.Component<Props, undefined> {
    appEnv: string;
    appVersion: string;
    host: string;

    constructor(props: any) {
        super(props);

        if (typeof window !== 'undefined') {
            const config = (window as any).__CONFIG;

            this.appEnv = config.appEnv;
            this.appVersion = config.appVersion;
            this.host = config.host;
        } else if (process.env) {
            this.appEnv = process.env.APP_ENV;
            this.appVersion = process.env.APP_VERSION;
            this.host = process.env.HOSTNAME;
        }
    }

    renderAssets(): ReactElement<HTMLTableRowElement>[] {
        const assets = this.props.environment.assets;
        if (!assets) {
            return null;
        }
        return assets.getKeys().map((key) => (
            <tr key={key}>
                <td>{key}</td>
                <td><a href={assets.get(key)} target="_blank">{assets.get(key)}</a></td>
            </tr>
        ));
    }

    render() {
        return (
            <div className="t-doc">
                <div className="t-doc__main">
                    <h1>Status</h1>
                    <p className="right"><a
                        href={`${this.props.environment.apiHostname}/status`}
                        className="btn"
                        target="_blank"
                    >API Status</a></p>
                    <h2>App</h2>
                    <table className="table table--striped">
                        <tbody>
                        <tr>
                            <th>Environment</th>
                            <td>{this.props.environment.appEnv}</td>
                        </tr>
                        <tr>
                            <th>Version</th>
                            <td>{this.props.environment.appVersion}</td>
                        </tr>
                        <tr>
                            <th>API Hostname</th>
                            <td>{this.props.environment.apiHostname}</td>
                        </tr>
                        </tbody>
                    </table>

                    <h2>Request</h2>
                    <table className="table table--striped">
                        <tbody>
                        <tr>
                            <th>Host</th>
                            <td>{this.props.environment.host}</td>
                        </tr>
                        <tr>
                            <th>Server Rendered</th>
                            <td>{this.props.environment.isServer ? 'yes' : 'no'}</td>
                        </tr>
                        <tr>
                            <th>Client Rendered</th>
                            <td>{this.props.environment.isClient ? 'yes' : 'no'}</td>
                        </tr>
                        </tbody>
                    </table>

                    <h2>Assets</h2>
                    <table className="table table--striped">
                        <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Full path</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderAssets()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: StateInterface) => ({
        environment: state.environment
    }),
    null
)(Container);
