import * as React from 'react';
import { connect } from 'react-redux';

import {getAll as allAssets, getAsset} from "../../../Application/Assets";
import {ReactElement} from "react";

class Container extends React.Component<undefined, undefined> {
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
        const assets = allAssets();
        if (!assets) {
            return null;
        }
        const rows = [];
        for (const key in assets) {
            rows.push(
                <tr key={key}>
                    <td>{key}</td>
                    <td>{getAsset(key)}</td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div className="t-doc">
                <div className="t-doc__main">
                    <h1>Status</h1>
                    <p className="right"><a href="api" className="btn">API Status</a></p>
                    <h2>App</h2>
                    <table className="table table--striped">
                        <tbody>
                        <tr>
                            <th>Environment</th>
                            <td>{this.appEnv}</td>
                        </tr>
                        <tr>
                            <th>Version</th>
                            <td>{this.appVersion}</td>
                        </tr>
                        </tbody>
                    </table>

                    <h2>Request</h2>
                    <table className="table table--striped">
                        <tbody>
                        <tr>
                            <th>Host</th>
                            <td>{this.host}</td>
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

export default connect()(Container);
