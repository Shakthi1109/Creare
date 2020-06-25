import express, { Request, Response } from "express";
import { schoolValidator } from "../validator/school-validator";
import { validateRequest } from "../middlewares/validate-request";

import {
  addSchoolController,
  updateSchoolController,
  getAllSchoolController,
  getSchoolByIdController,
  schoolActivityController,
} from "../controller/school-controller";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-admin-auth";

const router = express.Router();

// to add new School
router.post("/add", schoolValidator, validateRequest, addSchoolController);

// modify school
router.put(
  "/update/:schoolId",
  currentUser,
  requireAuth,
  schoolValidator,
  validateRequest,
  updateSchoolController
);

// fetch all school
router.get("/getAllSchool", currentUser, requireAuth, getAllSchoolController);

// fetch school by id
router.get(
  "/getSchoolById/:schoolId",
  currentUser,
  requireAuth,
  getSchoolByIdController
);

// To change activity of school from active to not active.
router.put(
  "/activity/update/:schoolId",
  currentUser,
  requireAuth,
  schoolActivityController
);

router.get("/test", (req: Request, res: Response) => {
  res.send("server school api is responding");
});

export { router as schoolRouter };
