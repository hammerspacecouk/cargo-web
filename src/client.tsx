import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import DI from './DI';
import App from './App';

// static assets
import './scss/app.scss';
import './imgs';
import {UserInterface} from "./models/User";

// init the DI container specifically with client settings
DI.init((window as any).__ASSETS);

const user: UserInterface = (window as any).__USER;
delete (window as any).__USER;

ReactDOM.render(
    (
        <BrowserRouter>
            <App user={user} />
        </BrowserRouter>
    ),
    document.getElementById('root')
);
