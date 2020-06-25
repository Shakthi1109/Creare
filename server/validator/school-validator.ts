import { body } from "express-validator";

export const schoolValidator = [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("address1").not().isEmpty().withMessage("Address Line 1 is required"),
  body("pincode").not().isEmpty().withMessage("Pincode is required"),
  body("city").not().isEmpty().withMessage("City is required"),
  body("state").not().isEmpty().withMessage("State is required"),
];
