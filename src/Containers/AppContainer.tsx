import * as React from "react";
import { Route, RouteProps, Switch } from "react-router-dom";

import SessionContextComponent from "../Context/SessionContext";
import Masthead from "../Components/Navigation/Masthead";
import NotFound from "../Components/Error/NotFound";

interface Props {
  routes: RouteProps[];
  initialData?: any;
}

export default ({ routes, initialData }: Props) => (
  <SessionContextComponent>
    <Masthead />
    <main>
      <div className="main">
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={props =>
                React.createElement(route.component, {
                  ...props,
                  initialData
                })
              }
            />
          ))}
          <Route component={NotFound} />
        </Switch>
      </div>
    </main>
  </SessionContextComponent>
);
