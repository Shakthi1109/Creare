import { body } from "express-validator";
import { UserRole } from "../util/enum/user-roles";

// TODO add validations for signup
// lookup the controller for the following and write validator for the field you get form req.body

export const signupValidator = [
  body("name").not().isEmpty().withMessage("Name cannot be Empty"),
  body("email").isEmail().withMessage("The Email you entered is not Valid."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("The password should be minimum of 6 characters."),
  body("role")
    .equals(UserRole.Admin || UserRole.Student || UserRole.Teacher)
    .withMessage("Invalid Role"),
];

// TODO add validations for signin
// lookup the controller for the following and write validator for the field you get form req.body
export const signinValidator = [
  body("email").isEmail().withMessage("The Email you entered is not Valid."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 character"),
];
