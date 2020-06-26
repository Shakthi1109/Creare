import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { subjectValidator } from "../validator/subject-validator";

import {
  addSubjectController,
  updateSubjectController,
  getActiveSubjectController,
  getSubjectByIdController,
  subjectActivityController,
  getSubjectsController,
} from "../controller/subject-controller";

import { currentUser } from "../middlewares/current-user";
import { requireAdminAuth } from "../middlewares/require-admin-auth";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

// fetch all active subjects
router.get("/", currentUser, requireAuth, getActiveSubjectController);

// fetch all subjects
router.get("/all", currentUser, requireAdminAuth, getSubjectsController);

// fetch subject by id
router.get("/:subjectId", currentUser, requireAdminAuth, getSubjectByIdController);

// to add new Subject only by admin
router.post(
  "/add",
  currentUser,
  requireAdminAuth,
  subjectValidator,
  validateRequest,
  addSubjectController
);

// To change activity of subject from active to not active.
router.put(
  "/activity/:subjectId",
  currentUser,
  requireAdminAuth,
  subjectActivityController
);

// modify subject
router.put("/:subjectId", currentUser, requireAdminAuth, updateSubjectController);

router.get("/test", (req: Request, res: Response) => {
  res.send("server subject api is responding");
});

export { router as subjectRouter };
