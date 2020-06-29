import express, { Request, Response } from "express";

import { validateRequest } from "../middlewares/validate-request";

import { addClassController } from "../controller/classroom-controller";
import { currentUser } from "../middlewares/current-user";
import { requireAdminAuth } from "../middlewares/require-admin-auth";

const router = express.Router();

router.post("/add", currentUser, requireAdminAuth, addClassController);

router.get("/test", (req: Request, res: Response) => {
  res.send("server school api is responding");
});

export { router as classroomRouter };
