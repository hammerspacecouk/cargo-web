import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import DI from './DI';
import App from './App';

// static assets
import './scss/app.scss';
import './imgs';

// init the DI container specifically with client settings
DI.init((window as any).__ASSETS);

ReactDOM.render(
    (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    ),
    document.getElementById('root')
);
