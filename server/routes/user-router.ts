import express, { Request, Response } from "express";
// TODO once you write validator uncomment the below
import { signupValidator, signinValidator } from "../validator/user-validator";
import {
	signupController,
	signinController,
	currentUserController,
	getUsersController,
	signoutController,
	requestedUserController,
	activeUsersController,
	getParticularUserController
} from "../controller/user-controller";

import { validateRequest } from "../middlewares/validate-request";
import { currentUser } from "../middlewares/current-user";
import { requireAdminAuth } from "../middlewares/require-admin-auth";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

// to fetch current user cookie info
router.get("/currentUser", currentUser, currentUserController);

// to signout user
router.get("/signout", signoutController);

// to get no approved users
router.get("/requests", currentUser, requireAdminAuth, requestedUserController);

// to get role base approved users
router.get(
	"/active/:type",
	currentUser,
	requireAdminAuth,
	activeUsersController
);

// to fetch all users that belong to particular school
router.get("/", currentUser, requireAdminAuth, getUsersController);

// to get particular user
router.get(
	"/:userId",
	currentUser,
	requireAdminAuth,
	getParticularUserController
);

// to signup new User
router.post("/signup", signupValidator, validateRequest, signupController);

// to login new User
router.post("/signin", signinValidator, validateRequest, signinController);

router.get("/test", (req: Request, res: Response) => {
	res.send("server user api is responding");
});

export { router as userRouter };
