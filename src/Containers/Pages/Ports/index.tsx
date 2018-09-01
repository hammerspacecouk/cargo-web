import * as React from "react";
import { Route, Switch } from "react-router";

import ListContainer from "./ListContainer";
import ShowContainer from "./ShowContainer";
import NotFound from "../../../Components/Error/NotFound";

export default () => (
  <div>
    <Switch>
      <Route path="/ports/:portId" component={ShowContainer} exact={true} />
      <Route path="/ports" component={ListContainer} exact={true} />
      <Route component={NotFound} />
    </Switch>
  </div>
);
