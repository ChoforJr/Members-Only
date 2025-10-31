import { Router } from "express";
import { homePageGet, signUpPageGet } from "../controllers/readDB.js";

const indexRouter = Router();

indexRouter.get("/sign-up", signUpPageGet);

indexRouter.get("/", homePageGet);

export default indexRouter;
