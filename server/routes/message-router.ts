import express, { Request, Response } from "express";

import {
  addMessageController,
  getAllMessageController,
} from "../controller/message-controller";
import { currentUser } from "../middlewares/current-user";

import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get("/:roomId", currentUser, requireAuth, getAllMessageController);

router.post("/:roomId", currentUser, requireAuth, addMessageController);

router.get("/test", (req: Request, res: Response) => {
  res.send("server message api is responding");
});

export { router as messageRouter };
