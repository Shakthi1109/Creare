import express, { Request, Response } from "express";
// TODO once you write validator uncomment the below
import { signupValidator, signinValidator } from "../validator/user-validator";
import {
  signupController,
  signinController,
  currentUserController,
  getUsersController,
  signoutController,
} from "../controller/user-controller";

import { validateRequest } from "../middlewares/validate-request";
import { currentUser } from "../middlewares/current-user";
import { requireAdminAuth } from "../middlewares/require-admin-auth";

const router = express.Router();

// to fetch current user cookie info
router.get("/currentUser", currentUser, currentUserController);

// to signout user
router.get("/signout", signoutController);

// to signup new User
router.post("/signup", signupValidator, validateRequest, signupController);

// to login new User
router.post("/signin", signinValidator, validateRequest, signinController);

// to fetch all users that belong to particular school
router.get("/all", currentUser, requireAdminAuth, getUsersController);

router.get("/test", (req: Request, res: Response) => {
  res.send("server user api is responding");
});

export { router as userRouter };
