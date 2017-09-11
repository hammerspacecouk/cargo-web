import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

// cut the mustard for features we use. Everything else will be server rendering
if ('fetch' in window) {
    ReactDOM.render(
        (
            <BrowserRouter>
                <App name="Client" />
            </BrowserRouter>
        ),
        document.getElementById('root')
    );
}
