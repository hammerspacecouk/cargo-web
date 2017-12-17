import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import DI from './DI';
import App from './App';

// static assets
import './scss/app.scss';
import './imgs';
import {UserInterface} from "./models/User";
import Score from "./models/Score";

const config = (window as any).__CONFIG;

// init the DI container specifically with client settings
DI.init(config.assets);

const user = (window as any).__USER;
delete (window as any).__USER;

if (user && user.score) {
    user.score = new Score(user.score.value, user.score.rate, user.score.datetime);
}

ReactDOM.render(
    (
        <BrowserRouter>
            <App user={user} />
        </BrowserRouter>
    ),
    document.getElementById('root')
);
