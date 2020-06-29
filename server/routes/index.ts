import express, { Request, Response } from "express";
import { userRouter } from "./user-router";
import { schoolRouter } from "./school-router";
import { subjectRouter } from "./subject-router";
import { teacherRouter } from "./teacher-router";

const router = express.Router();

router.use("/user", userRouter);

router.use("/school", schoolRouter);

router.use("/subject", subjectRouter);

router.use("/teacher", teacherRouter);

router.get("/test", (req: Request, res: Response) => {
  res.send("server api is responding");
});

export { router };
