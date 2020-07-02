import express, { Request, Response } from "express";

import {
  addAttendancelogController,
  getAllAttendancelogController,
} from "../controller/attendancelogController";
import { currentUser } from "../middlewares/current-user";

import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get("/", currentUser, requireAuth, getAllAttendancelogController);

router.post("/add", currentUser, requireAuth, addAttendancelogController);

router.post("/");
router.get("/test", (req: Request, res: Response) => {
  res.send("server attendavnelog api is responding");
});

export { router as messageRouter };
