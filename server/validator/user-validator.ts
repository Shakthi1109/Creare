import { body } from "express-validator";
import { UserRole } from "../util/enum/user-roles";


// signup validator
export const signupValidator = [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password with min. of 6 chars is required"),
  body("role")
    .equals(UserRole.Admin || UserRole.Student || UserRole.Teacher)
    .withMessage("Valid role is required"),
  body("uniqRef").not().isEmpty().withMessage("School is required"),
];

// sigin validator
export const signinValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("valid password is required"),
];
