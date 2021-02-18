import React from 'react';
import { Switch, Route, Link, HashRouter } from 'react-router-dom';
// pages
import HomeView from '../views/HomeView';
import TodoView from '~/views/TodoView';

//  TODO: Desmond:少了權限判斷的Route，有些頁面是需要登錄後才能訪問的
//  Desmond:缺少錯誤處理機制：ErrorBoundary。
//  整個項目還少一個user的domain、ducks，需要把user有沒有登錄、登錄後哪些頁面可以訪問的機制實現
//  並在README.md說明
const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/todo" component={TodoView} />
    </Switch>
);

export default Routes;