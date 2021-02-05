import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store';
import { HashRouter } from 'react-router-dom';
import HeaderNavigator from './components/navigator/HeaderNavigator';
import Routes from './routers/routes';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <HeaderNavigator />
            <Routes />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);