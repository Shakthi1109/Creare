import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";

import {
  getTeacherByIdController,
  addTeacherController,
  updateTeacherController,
} from "../controller/teacher-controller";

import { currentUser } from "../middlewares/current-user";
import { requireAdminAuth } from "../middlewares/require-admin-auth";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();



// fetch Teacher by id
router.get(
  "/:teacherId",
  currentUser,
  requireAdminAuth,
  getTeacherByIdController
);

// to add new teacher only by admin
router.post(
  "/add/profile/:userId",
  currentUser,
  requireAdminAuth,
  validateRequest,
  addTeacherController
);

// modify Teacher
router.put(
  "/:teacherId",
  currentUser,
  requireAdminAuth,
  updateTeacherController
);

router.get("/test", (req: Request, res: Response) => {
  res.send("server Teacher api is responding");
});

export { router as teacherRouter };
