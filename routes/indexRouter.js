import { Router } from "express";
import { homePageGet, signUpPageGet } from "../controllers/readDB.js";
import { addNewUser } from "../controllers/postToDB.js";
import {
  checkValidationResult,
  validateSignUpRules,
} from "../controllers/validations/validateSignUp.js";

const indexRouter = Router();

indexRouter.get("/sign-up", signUpPageGet);
indexRouter.post(
  "/sign-up",
  validateSignUpRules,
  checkValidationResult,
  addNewUser
);

indexRouter.get("/", homePageGet);

export default indexRouter;
