import { body } from "express-validator";

export const subjectValidator = [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("grade").not().isEmpty().withMessage("Grade is required"),
  body("uniqRef").not().isEmpty().withMessage("uniqRefis required"),
];
