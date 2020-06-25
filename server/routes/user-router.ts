import express, { Request, Response } from "express";
// TODO once you write validator uncomment the below
import { signupValidator, signinValidator } from "../validator/user-validator";
import {
  signupController,
  signinController,
  currentUserController,
  getUsersController,
} from "../controller/user-controller";

import { validateRequest } from "../middlewares/validate-request";
import { currentUser } from "../middlewares/current-user";
import { requireAdminAuth } from "../middlewares/require-admin-auth";

const router = express.Router();

// to fetch current user cookie info
router.get("/currentUser", currentUser, currentUserController);

// to fetch all users
router.get("/", currentUser, requireAdminAuth, getUsersController);

// TODO once you write validators ,add the validator just before validateRequest
// to signup new User
router.post("/signup", signupValidator, validateRequest, signupController);

// TODO once you write validators ,add the validator just before validateRequest
// to login new User

router.post("/signin", signinValidator, validateRequest, signinController);

router.get("/test", (req: Request, res: Response) => {
  res.send("server user api is responding");
});

export { router as userRouter };
