import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { HomePage, AboutPage } from "pages";
const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/about" exact component={AboutPage} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};
export default Routes;
