import * as React from "react";
import { Route, Switch } from "react-router-dom";

import SessionContextComponent from "../Context/SessionContext";
import MastheadContainer from "./Common/MastheadContainer";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Play from "./Pages/Play";
import Ports from "./Pages/Ports";
import Profile from "./Pages/Profile";
import Login from "./Pages/LoginContainer";
import LoginEmail from "./Pages/LoginEmailContainer";

import NotFound from "../Components/Error/NotFound";
import CurrentShipContextComponent from "../Context/CurrentShipContext";

export default () => (
  <SessionContextComponent>
    <CurrentShipContextComponent>
      <MastheadContainer />
      <main>
        <div className="main">
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/play" component={Play} />
            <Route path="/ports" component={Ports} />
            <Route path="/profile" component={Profile} />

            <Route path="/login/email" component={LoginEmail} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/" component={Home} exact={true} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    </CurrentShipContextComponent>
  </SessionContextComponent>
);
