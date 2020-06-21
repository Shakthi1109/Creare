import { Request, Response } from "express";

import { router } from "./routes";

import { app, handler, nextApp } from "./app";

const start = async () => {
  try {
    await nextApp.prepare();
    // middleware for server routes -> /api/<name or the route>
    app.use("/api", router);
    // middleware for client routes -> /<name or the route>
    app.all("*", (req: Request, res: Response) => handler(req, res));
    // server start listening here
    app.listen(process.env.PORT, () => {
      console.log(`Creare ready on port ${process.env.PORT} !!!`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
