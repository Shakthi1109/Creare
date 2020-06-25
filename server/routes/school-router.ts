import express, { Request, Response } from "express";
import { schoolValidator } from "../validator/school-validator";
import { validateRequest } from "../middlewares/validate-request";

import {
  addSchoolController,
  updateSchoolController,
  getAllSchoolController,
  getSchoolByIdController,
  schoolActivityController,
  getActiveSchoolController,
} from "../controller/school-controller";
import { currentUser } from "../middlewares/current-user";
import { requireAdminAuth } from "../middlewares/require-admin-auth";

const router = express.Router();

// fetch all school
// TODO add access only to superuser
router.get("/all", currentUser, requireAdminAuth, getAllSchoolController);

// fetch all active schools
router.get("/", getActiveSchoolController);

// fetch school by id
router.get("/byId", currentUser, requireAdminAuth, getSchoolByIdController);

// to add new School
router.post("/add", schoolValidator, validateRequest, addSchoolController);

// To change activity of school from active to not active.
router.put(
  "/activity",
  currentUser,
  requireAdminAuth,
  schoolActivityController
);

// modify school
router.put("/", currentUser, requireAdminAuth, updateSchoolController);

router.get("/test", (req: Request, res: Response) => {
  res.send("server school api is responding");
});

export { router as schoolRouter };