import { body, validationResult } from "express-validator";
import { getUserInfoByUsername } from "../../db/queriesGet";

function validateSignUpRules() {
  body("username")
    .trim()
    .matches(/^[A-Za-z0-9\s]+$/) // Allows letters, numbers, and spaces
    .withMessage("Email: must contain only letters, numbers, and spaces.")
    .isLength({ min: 2, max: 64 })
    .withMessage("Email: Has to have a length of between 8 and 250")
    .isEmail()
    .withMessage("Email: Should be an email")
    .custom(async (value) => {
      const rows = await getUserInfoByUsername(value);
      const user = rows[0];
      if (!user) {
        return true;
      }
      throw new Error("Name: Has already been Added");
    }),
    body("fullname")
      .trim()
      .matches(/^[A-Za-z\s]+$/) // Allows letters and spaces
      .withMessage("Full Name: must contain only letters")
      .isLength({ min: 8, max: 250 })
      .withMessage("Full Name: Has to have a length of between 8 and 250"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 250 })
      .withMessage("Password: Has to have a length of between 8 and 250"),
    body("confirmPassword")
      .trim()
      .notEmpty()
      .withMessage("Confirm Password is required")
      .isLength({ min: 8, max: 250 })
      .withMessage(
        "Confirm Password: Has to have a length of between 8 and 250"
      )
      .custom(async (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }),
    body("isAdmin").optional();
}

export const validateSignUp = (req, res, next) => {
  validateSignUpRules();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const checkAdmin = req.body.isAdmin || false;
    return res.status(400).render("sign-up", {
      errors: errors.array(),
      username: req.body.username,
      fullname: req.body.fullname,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      isAdmin: checkAdmin,
    });
  } else {
    next();
  }
};
