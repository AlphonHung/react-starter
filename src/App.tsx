import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import configureStore from '~/store/configureStore';
import Header from '~/components/Header';
import Routes from './routers/routes';
import '~/assets/scss/App.scss';

const store = configureStore();

/** 根節點 */
const App = () => (
    <Provider store={store}>
        <HashRouter>
            <Header />
            <Routes />
        </HashRouter>
    </Provider>
)

export default App;