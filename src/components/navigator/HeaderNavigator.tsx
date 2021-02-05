import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNavigator = () => (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/fake">Fake</Link></li>
        <li><Link to="/todo">Todo</Link></li>
    </ul>
);

export default HeaderNavigator;