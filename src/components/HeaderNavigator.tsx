import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import '~/assets/scss/components/HeaderNavigator.scss';

/** 選單 */
const HeaderNavigator = () => (
    <div className="header-navigator">
        <Link className="page-link" to="/">Home</Link>
        <Link className="page-link" to="/todo">Todo</Link>
    </div>
);

export default HeaderNavigator;