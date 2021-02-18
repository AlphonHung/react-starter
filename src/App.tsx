import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { SystemActionCreators } from '~/store'
import useI18n from '~/hooks/useI18n';
import ErrorBoundary from '~/views/ErrorBoundary';
import MainRoute from './routers/MainRoute';
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
        <ErrorBoundary>
            <HashRouter>
                <MainRoute />
            </HashRouter>
        </ErrorBoundary>
    )
}

export default App;