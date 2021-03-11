import React from 'react';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '~/store';
import HeaderNavigator from '~/components/HeaderNavigator';
import LocaleSelector from '~/components/LocaleSelector';
import { Button } from 'react-bootstrap';
import '~/assets/scss/components/Header.scss';

/** 上方Header */
const HomeHeader = () => {
    const dispatch = useDispatch();
    return (
        <header className="home-header">
            <HeaderNavigator />
            <LocaleSelector />
            <Button variant="info" onClick={() => { dispatch(AuthActionCreators.logout()) }}>開發登出</Button>
        </header>
    )
};

export default HomeHeader;