import { Request, Response } from "express";
import "express-async-errors";
import mongoose from "mongoose";

import { router } from "./routes";

import { app, handler, nextApp } from "./app";
import { errorHandler } from "./middlewares/error-handler";
import { envCheck } from "./util/env-check";
import { io } from "./socket";

const start = async () => {
  try {
    envCheck();

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await nextApp.prepare();
    // middleware for server routes -> /api/<name or the route>
    app.use("/api", router);
    // handles all the error thrown in api routes
    app.use(errorHandler);
    // middleware for client routes -> /<name or the route>
    app.all("*", (req: Request, res: Response) => handler(req, res));
    // server start listening here
    console.log("Mongo db is connected");
    app.listen(process.env.PORT, () => {
      console.log(`Creare ready on port ${process.env.PORT} !!!`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(0);
  }
};

start();
