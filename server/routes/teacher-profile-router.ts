import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";

import {
  getTeacherProfileController,
  getTeacherProfileAdminController,
  addTeacherProfileController,
  updateTeacherProfileController,
  updateTeacherProfileAdminController,
} from "../controller/teacher-controller";

import { currentUser } from "../middlewares/current-user";
import { requireAdminAuth } from "../middlewares/require-admin-auth";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

// fetch Teacher profile by user
router.get("/", currentUser, requireAuth, getTeacherProfileController);

// fetch Teacher by id for admin
router.get(
  "/:teacherId",
  currentUser,
  requireAdminAuth,
  getTeacherProfileAdminController
);

// to add new teacher only by admin
router.post("/add/:userId", currentUser, addTeacherProfileController);

// modify Teacher
router.put("/update", currentUser, requireAuth, updateTeacherProfileController);

// modify Teacher only by Admin
router.put(
  "/update/:teacherId",
  currentUser,
  requireAdminAuth,
  updateTeacherProfileAdminController
);

router.get("/test", (req: Request, res: Response) => {
  res.send("server Teacher api is responding");
});

export { router as teacherProfileRouter };
