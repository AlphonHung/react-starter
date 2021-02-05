import React from 'react';
import '~/assets/scss/pages/Main.scss';

interface IMainProps {
    title: String
}

/** 主要操作區 */
const Main = (props: IMainProps) => {
    return (
        <div className="main">
            <h1>Test Hello World {props.title}</h1>
        </div>
    );
}
export default Main;