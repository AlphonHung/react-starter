import React from 'react';
import { useLocation, Link } from "react-router-dom";

const NoMatchView = () => {
    const location = useLocation();
    return (
        <div>
            <h3>No match for <code>{location.pathname}</code></h3>
            <Link to="/">Back to home</Link>
        </div>
    )
};

export default NoMatchView;