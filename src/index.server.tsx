import * as React from "react";
import { Application } from "express";
import { handler as baseHandler } from "./server/base.html";
import { handler as robotsHandler } from "./server/robots.txt";

export default (app: Application) => {
  app.get("/robots.txt", robotsHandler);
  app.get("*", baseHandler);
};
