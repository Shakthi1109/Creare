import { body } from "express-validator";

export const subjectValidator = [
  body("name").isLength({ min: 3 }).withMessage("Valid name is required"),
  body("grade").not().isEmpty().withMessage("Grade is required"),
];
