import { NextFunction, Request, Response } from "express";

export const handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200);
  res.set({
    "cache-control": 60 * 60 * 24,
    "content-type": "text/plain",
  });
  res.end(`
User-agent: *
Disallow: /play
Disallow: /profile
`);
};
