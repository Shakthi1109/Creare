import express, { Request, Response } from "express"
import { schoolValidator } from "../validator/school-validator"
import { validateRequest } from "../middlewares/validate-request"

import {
	addSchoolController,
	updateSchoolController,
	getAllSchoolController,
	getSchoolByIdController,
	schoolActivityController,
} from "../controller/school-controller"
import { currentUser } from "../middlewares/current-user"
import { requireAdminAuth } from "../middlewares/require-admin-auth"

const router = express.Router()

// fetch all school
router.get("/", currentUser, requireAdminAuth, getAllSchoolController)

// fetch school by id
router.get("/:schoolId", currentUser, requireAdminAuth, getSchoolByIdController)

// to add new School
router.post("/add", schoolValidator, validateRequest, addSchoolController)

// To change activity of school from active to not active.
router.put(
	"/activity/:schoolId",
	currentUser,
	requireAdminAuth,
	schoolActivityController,
)

// modify school
router.put(
	"/:schoolId",
	currentUser,
	requireAdminAuth,
	schoolValidator,
	validateRequest,
	updateSchoolController,
)

router.get("/test", (req: Request, res: Response) => {
	res.send("server school api is responding")
})

export { router as schoolRouter }
