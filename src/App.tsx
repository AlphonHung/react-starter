import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { SystemActionCreators } from '~/store'
import useI18n from '~/hooks/useI18n';
import Header from '~/components/Header';
import Routes from './routers/routes';
import '~/assets/scss/App.scss';
import '~lib/rem';

/** 根節點 */
const App = () => {
    const { i18nInitialized } = useI18n.init();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SystemActionCreators.initApp());
    }, []);

    if (!i18nInitialized) return null;
    return (
        <HashRouter>
            <Header />
            <Routes />
        </HashRouter>
    )
}

export default App;