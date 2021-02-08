import React from 'react';
import { Link } from 'react-router-dom';
import '~/assets/scss/components/HeaderNavigator.scss';

const HeaderNavigator = () => (
    <ul className="header-navigator">
        <li className="page-link"><Link to="/">Home</Link></li>
        <li className="page-link"><Link to="/todo">Todo</Link></li>
    </ul>
);

export default HeaderNavigator;