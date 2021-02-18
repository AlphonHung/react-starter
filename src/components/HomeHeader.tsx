import React from 'react';
import HeaderNavigator from '~/components/HeaderNavigator';
import LocaleSelector from '~/components/LocaleSelector';
import '~/assets/scss/components/Header.scss';

/** 上方Header */
const HomeHeader = () => (
    <header className="home-header">
        <HeaderNavigator />
        <LocaleSelector />
    </header>
)

export default HomeHeader;