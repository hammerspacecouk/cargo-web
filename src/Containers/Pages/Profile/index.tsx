import * as React from "react";
import { Route, Switch } from "react-router";

import NotFound from "../../../Components/Error/NotFound";
import ProfileContainer from "./ProfileContainer";
import DeleteContainer from "./DeleteContainer";
import EnsureLoggedIn from "../../Common/EnsureLoggedIn";

export default () => (
  <EnsureLoggedIn>
    <div>
      <Switch>
        <Route
          path="/profile/delete"
          component={DeleteContainer}
          exact={true}
        />
        <Route path="/profile" component={ProfileContainer} exact={true} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </EnsureLoggedIn>
);
