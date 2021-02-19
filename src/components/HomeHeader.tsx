import React from 'react';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '~/store';
import HeaderNavigator from '~/components/HeaderNavigator';
import LocaleSelector from '~/components/LocaleSelector';
import '~/assets/scss/components/Header.scss';

/** 上方Header */
const HomeHeader = () => {
    const dispatch = useDispatch();
    return (
        <header className="home-header">
            <HeaderNavigator />
            <LocaleSelector />
            <button onClick={() => { dispatch(AuthActionCreators.logout()) }}>開發登出</button>
        </header>
    )
};

export default HomeHeader;