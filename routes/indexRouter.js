import { Router } from "express";
import passport from "passport";
import {
  homePageGet,
  signUpPageGet,
  logInPageGet,
  newMsgPageGet,
} from "../controllers/readDB.js";
import { addNewUser, addNewMessage } from "../controllers/postToDB.js";
import {
  checkValidationResult,
  validateSignUpRules,
} from "../controllers/validations/validateSignUp.js";
import {
  validateLogInRules,
  checkLoginValidationResult,
} from "../controllers/validations/validateLogIn.js";
import {
  validateMessageRules,
  checkMessageValidationResult,
} from "../controllers/validations/validateMessege.js";
import { delMessage } from "../controllers/deleteFromDB.js";

const indexRouter = Router();

indexRouter.get("/sign-up", signUpPageGet);
indexRouter.post(
  "/sign-up",
  validateSignUpRules,
  checkValidationResult,
  addNewUser
);

indexRouter.get("/create-new-message", newMsgPageGet);
indexRouter.post(
  "/create-new-message",
  validateMessageRules,
  checkMessageValidationResult,
  addNewMessage
);

indexRouter.get("/log-in", logInPageGet);
indexRouter.post(
  "/log-in",
  validateLogInRules,
  checkLoginValidationResult,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

indexRouter.post("/delMsg/:id", delMessage);

indexRouter.get("/", homePageGet);

export default indexRouter;
