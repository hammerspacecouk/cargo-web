import * as React from "react";
import { hydrate as ReactDomRender } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import AppContainer from "./Containers/AppContainer";

// static assets
import "../static/scss/app.scss";
import "../static/imgs";

ReactDomRender(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
  document.getElementById("root")
);
