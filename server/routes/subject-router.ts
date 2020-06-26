import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { subjectValidator } from "../validator/subject-validator";

import {
  addSubjectController,
  updateSubjectController,
  getActiveSubjectController,
  getSubjectByIdController,
  subjectActivityController,
} from "../controller/subject-controller";

import { currentUser } from "../middlewares/current-user";
import { requireAdminAuth } from "../middlewares/require-admin-auth";

const router = express.Router();

// fetch all active subjects
router.get("/", currentUser, requireAdminAuth, getActiveSubjectController);

// fetch subject by id
router.get("/:id", currentUser, requireAdminAuth, getSubjectByIdController);

// to add new Subject
router.post(
  "/add",
  subjectValidator,
  currentUser,
  requireAdminAuth,
  validateRequest,
  addSubjectController
);

// To change activity of subject from active to not active.
router.put(
  "/activity/:id",
  currentUser,
  requireAdminAuth,
  subjectActivityController
);

// modify subject
router.put(
  "/:id",
  subjectValidator,
  currentUser,
  requireAdminAuth,
  updateSubjectController
);

router.get("/test", (req: Request, res: Response) => {
  res.send("server subject api is responding");
});

export { router as subjectRouter };
