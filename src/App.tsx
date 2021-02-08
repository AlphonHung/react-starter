import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import configureStore from '~/store/configureStore';
import useI18n from '~/hooks/useI18n';
import Header from '~/components/Header';
import Routes from './routers/routes';
import '~/assets/scss/App.scss';

const store = configureStore();

/** 根節點 */
const App = () => {
    const { i18nInitialized } = useI18n.init();
    return (
        <Provider store={store}>
            {i18nInitialized && <HashRouter>
                <Header />
                <Routes />
            </HashRouter>}
        </Provider>
    )
}

export default App;