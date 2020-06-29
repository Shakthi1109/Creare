import express, { Request, Response } from "express";
import { userRouter } from "./user-router";
import { schoolRouter } from "./school-router";
import { subjectRouter } from "./subject-router";

import { teacherRouter } from "./teacher-router";
import { classroomRouter } from "./classroom-router";

import { teacherProfileRouter } from "./teacher-profile-router";

const router = express.Router();

router.use("/user", userRouter);

router.use("/school", schoolRouter);

router.use("/subject", subjectRouter);

router.use("/teacher/profile", teacherProfileRouter);

router.use("/classroom", classroomRouter);

router.get("/test", (req: Request, res: Response) => {
  res.send("server api is responding");
});

export { router };
