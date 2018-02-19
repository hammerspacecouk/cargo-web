import * as React from 'react';
import {hydrate as ReactDomRender} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import { createStore } from 'redux';

import AppContainer from './Containers/AppContainer';
import Assets from './Helpers/Assets';
import reducers from './State';
import {EnvironmentStateInterface} from "./State/Environment";
import BrowserClient from "./Data/API/BrowserClient";
import console from "./Console";

// static assets
import '../static/scss/app.scss';
import '../static/imgs';


const environment: EnvironmentStateInterface = (window as any).__CONFIG; // todo - all stores here?

environment.isClient = true;
environment.isServer = false;
environment.apiClient = new BrowserClient(environment.apiHostname, console);
environment.assets = new Assets(environment.assetsManifest, environment.assetPrefix);

const store = createStore(reducers, {
    environment
}, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
ReactDomRender(
    (
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer />
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
);

















//
//
// // import DI from '../src/___to-move___/DI';
// import App from '../src';
// // import AppContainer from '../src/___to-move___/flux-test/AppContainer';
//
// // static assets
// import './assets/scss/app.scss';
// import './assets/imgs';
// // import Score from "./models/Score"; todo - cleanup comments
// //
// // // init the DI container specifically with client settings
// // DI.init((window as any).__ASSETS);
// //
// // const user = (window as any).__USER;
// // delete (window as any).__USER;
// //
// // if (user && user.score) {
// //     user.score = new Score(user.score.initialValue, user.score.rate, user.score.datetime);
// // }
//
// // ReactDOM.render(
// //     (
// //         <BrowserRouter>
// //             <App user={user} />
// //         </BrowserRouter>
// //     ),
// //     document.getElementById('root')
// // );
//
// ReactDOM.render(
//     (
//         <App />
//     ),
//     document.getElementById('root')
// );
//
//
