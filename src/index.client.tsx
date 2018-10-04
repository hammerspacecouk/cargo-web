import * as React from "react";
import { hydrate as ReactDomRender } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { matches as routes } from "./routes";
import AppContainer from "./Containers/AppContainer";

// static assets
import "../static/scss/app.scss";
import "../static/imgs";

const data = (window as any)._INITIAL_DATA_;

ReactDomRender(
  <BrowserRouter>
    <AppContainer routes={routes} initialData={data} />
  </BrowserRouter>,
  document.getElementById("root")
);
