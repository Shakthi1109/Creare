import { body } from "express-validator";

export const schoolValidator = [
  body("name").not().isEmpty().withMessage("Name cannot be Empty"),
  body("address1")
    .not()
    .isEmpty()
    .withMessage("Address Line 1 cannot be empty"),
  body("pincode").not().isEmpty().withMessage("Pincode cannot be Empty"),
  body("city").not().isEmpty().withMessage("City cannot be Empty"),
  body("state").not().isEmpty().withMessage("State cannot be Empty"),
];
