import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";

import store from './store';
import AppContainer from './Containers/AppContainer';
import {init as AssetsInit} from "./Application/Assets";
import {init as ParametersInit} from "./Application/Parameters";

// static assets
import './assets/scss/app.scss';
import './assets/imgs';

const config = (window as any).__CARGO_CONFIG;

AssetsInit((window as any).__ASSETS, config.assetsPrefix);
ParametersInit(config.apiHostname);

ReactDOM.render(
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
// import App from '../src/index';
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
