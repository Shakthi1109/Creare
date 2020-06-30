import express, { Request, Response } from "express";

import { validateRequest } from "../middlewares/validate-request";

import {
  addClassController,
  joinClassroomController,
  endClassroomController,
  cancelClassController,
  fetchClassroomByIdController,
  fetchAllClassroomController,
} from "../controller/classroom-controller";
import { currentUser } from "../middlewares/current-user";
import { requireAdminAuth } from "../middlewares/require-admin-auth";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get(
  "/fetch/all",
  currentUser,
  requireAdminAuth,
  fetchAllClassroomController
);

router.get(
  "/fetch/:classId",
  currentUser,
  requireAuth,
  fetchClassroomByIdController
);

router.post("/add", currentUser, requireAdminAuth, addClassController);

router.put("/join/:classId", currentUser, requireAuth, joinClassroomController);

router.put("/end/:classId", currentUser, requireAuth, endClassroomController);

router.put("/cancel/:classId", currentUser, requireAuth, cancelClassController);
router.get("/test", (req: Request, res: Response) => {
  res.send("server school api is responding");
});

export { router as classroomRouter };
