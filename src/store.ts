/* eslint-disable no-underscore-dangle */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './State';

const middleWare = applyMiddleware(thunk);

export default createStore(
    reducers,
    middleWare
);
