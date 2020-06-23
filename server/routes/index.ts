import express, { Request, Response } from "express";
import { userRouter } from "./user-router";

const router = express.Router();

router.use("/user", userRouter);

router.get("/test", (req: Request, res: Response) => {
  res.send("server api is responding");
});

export { router };
