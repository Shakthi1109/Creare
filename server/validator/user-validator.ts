import { body } from "express-validator";
import { UserRole } from "../util/enum/user-roles";

// TODO add validations for signup
// lookup the controller for the following and write validator for the field you get form req.body

export const signupValidator = [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password with min. of 6 chars is required"),
  body("role")
    .not()
    .equals(UserRole.Admin || UserRole.Student || UserRole.Teacher)
    .withMessage("Valid role is required"),
  body("uniqRef").not().isEmpty().withMessage("School uinqRef is required"),
];

// TODO add validations for signin
// lookup the controller for the following and write validator for the field you get form req.body
export const signinValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("valid password is required"),
];
