import { Router } from "express";
import { homePageGet } from "../controllers/readDB.js";

const indexRouter = Router();

indexRouter.get("/", homePageGet);

export default indexRouter;
