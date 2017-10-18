import * as React from 'react';

export default class Component extends React.Component<undefined, undefined> {
    render() {
        return (
            <div>
                <h1>Styleguide</h1>
                <p>
                    This is a collection of elements to demonstrate the overall design of the application.
                </p>

                <h2>Core</h2>
                <h2>Atoms</h2>
                <h2>Molecules</h2>

                <h3>Breadcrumbs</h3>

                <h3>Single item:</h3>
                <ol className="breadcrumb">
                    <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb one</a></li>
                </ol>

                <h3>Multiple items:</h3>
                <ol className="breadcrumb">
                    <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb one</a></li>
                    <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb two</a></li>
                    <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb three</a></li>
                    <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb four</a></li>
                </ol>

                <h2>Organisms</h2>

            </div>
        )
    }
}
