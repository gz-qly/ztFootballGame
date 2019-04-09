import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import Home from "./page/home/home"
import Index from "./page/index"
import Result from "./page/result"
import alert from "./page/alert"
import guize from "./page/guize"
import Sel from "./page/sel"




function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/" exact component={Index} />
        <Route path="/result" exact component={Result} />
        <Route path="/alert" exact component={alert} />
        <Route path="/guize" exact component={guize} />
        <Route path="/selImg" exact component={Sel} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
