// imports
import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import next from "next";
import "express-async-errors";
import enVariable from "dotenv";
import morgan from "morgan";

// constants
const isDev = process.env.NODE_ENV !== "production";

// including environemnt variables only in PRODUCTION
if (isDev) enVariable.config();

// middlewares config
const app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :response-time ms", {
    skip: (req) => req.statusCode < 400,
  })
);
app.use(
  cookieSession({
    signed: false,
  })
);

// next config
const nextApp = next({ dev: isDev });
const handler = nextApp.getRequestHandler();

export { app, nextApp, handler };
