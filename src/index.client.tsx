import * as React from "react";
import { hydrate as ReactDomRender } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "typeface-share-tech-mono";

import { App } from "./App";
import { matches as routes } from "./routes";

const data = (window as any)._INITIAL_DATA_;

ReactDomRender(
  <BrowserRouter>
    <App routes={routes} initialData={data} />
  </BrowserRouter>,
  document.getElementById("root")
);
