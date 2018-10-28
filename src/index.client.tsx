import * as React from "react";
import { hydrate as ReactDomRender } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { matches as routes } from "./routes";
import App from "./App";

// static assets
import "../static/scss/app.scss";
import "../static/imgs";
import "../static/fonts";

const data = (window as any)._INITIAL_DATA_;

ReactDomRender(
  <BrowserRouter>
    <App routes={routes} initialData={data} />
  </BrowserRouter>,
  document.getElementById("root")
);
