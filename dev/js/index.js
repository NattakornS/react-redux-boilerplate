import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import { AUTH_USER, UNAUTH_USER } from './actions/types';
import {
    HashRouter,
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import Signin from './containers/auth/signin';

import App from './components/App';

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise)
);

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
if (token && role) {
    store.dispatch({ type: AUTH_USER, payload: role });
} else {
    store.dispatch({ type: UNAUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/' component={App} />
            </Switch>
            {/* <App/> */}
        </HashRouter>
    </Provider>,
    document.querySelector('#container')
);
