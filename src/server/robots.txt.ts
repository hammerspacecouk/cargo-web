import { NextFunction, Request, Response } from "express";

export const handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200);
  res.set({
    "content-type": "text/plain",
    "cache-control": 60 * 60 * 24
  });
  res.end(`
User-agent: *
Disallow: /play
Disallow: /profile
`);
};
