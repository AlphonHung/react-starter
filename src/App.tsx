import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import HeaderNavigator from './components/navigator/HeaderNavigator';
import Routes from './routers/routes';
import '~/assets/scss/App.scss';

const store = configureStore();

/** 根節點 */
const App = () => (
    <Provider store={store}>
        <HashRouter>
            <HeaderNavigator />
            <Routes />
        </HashRouter>
    </Provider>
)

export default App;