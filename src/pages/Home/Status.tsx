import * as React from 'react';

export default class Component extends React.Component<undefined, undefined> {
    appEnv: string;
    appVersion: string;

    constructor() {
        super();

        if (typeof window !== 'undefined') {
            const config = (window as any).__CONFIG;

            this.appEnv = config.appEnv;
            this.appVersion = config.appVersion;
        } else if (process.env) {
            this.appEnv = process.env.APP_ENV;
            this.appVersion = process.env.APP_VERSION;
        }
    }

    render() {
        return (
            <div className="t-doc">
                <div className="t-doc__main">
                <h1>Status</h1>
                    <table className="table table--striped">
                        <tbody>
                        <tr>
                            <th>Environment</th>
                            <td>{this.appEnv}</td>
                        </tr>
                        <tr>
                            <th>Webapp Version</th>
                            <td>{this.appVersion}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
