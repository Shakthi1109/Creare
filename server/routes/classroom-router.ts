import express, { Request, Response } from "express";

import { validateRequest } from "../middlewares/validate-request";

import {
  addClassController,
  joinClassroomController,
} from "../controller/classroom-controller";
import { currentUser } from "../middlewares/current-user";
import { requireAdminAuth } from "../middlewares/require-admin-auth";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.post("/add", currentUser, requireAdminAuth, addClassController);

router.put("/join/:classId", currentUser, requireAuth, joinClassroomController);

router.get("/test", (req: Request, res: Response) => {
  res.send("server school api is responding");
});

export { router as classroomRouter };
