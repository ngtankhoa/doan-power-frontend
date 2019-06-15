import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "power-management/layouts/auth/Auth.jsx";
import Adminlayout from "power-management/layouts/admin/Admin.jsx"
import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/auth" component={AuthLayout} />
      <Route path="/admin" component={Adminlayout} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
