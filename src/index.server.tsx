import { Application } from "express";
import * as React from "react";
import { handler as baseHandler } from "./server/base.html";
import { handler as robotsHandler } from "./server/robots.txt";

export const start = (app: Application) => {
  app.get("/robots.txt", robotsHandler);
  app.get("*", baseHandler);
};
