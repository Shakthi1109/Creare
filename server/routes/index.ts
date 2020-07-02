import express, { Request, Response } from "express";
import { userRouter } from "./user-router";
import { schoolRouter } from "./school-router";
import { subjectRouter } from "./subject-router";
import { teacherProfileRouter } from "./teacher-profile-router";
import { messageRouter } from "./message-router";

const router = express.Router();

router.use("/user", userRouter);

router.use("/school", schoolRouter);

router.use("/subject", subjectRouter);

router.use("/teacher/profile", teacherProfileRouter);

router.use("/message", messageRouter);

router.get("/test", (req: Request, res: Response) => {
  res.send("server api is responding");
});

export { router };
