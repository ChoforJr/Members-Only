import express from "express";
import indexRouter from "./routes/indexRouter.js";
import path from "node:path";
import Pool from "./db/pool.js";
import session from "express-session";
import passport from "passport";
import createSessionStore from "connect-pg-simple";
import "./config/passport.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PgSessionStore = createSessionStore(session);
const sessionStore = new PgSessionStore({
  pool: Pool,
  tableName: "session", // Default table name is 'session'
  // Recommended for development, but consider running table.sql manually for production
  createTableIfMissing: () => {
    if (process.env.NODE_ENV === "dev") {
      return false;
    } else if (process.env.NODE_ENV === "prod") {
      return true;
    }
  },
});

// 2. Configure Express Session Middleware
// -------------------------------------
app.use(
  session({
    store: sessionStore, // <-- THIS is where your PostgreSQL store is used
    secret: process.env.SESSION_SECRET, // Required: Used to sign the session ID cookie
    resave: false, // Recommended: Don't save session if not modified
    saveUninitialized: false, // Recommended: Don't create a session until something is stored
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      secure: () => {
        // Set to true if you are using HTTPS
        if (process.env.NODE_ENV === "dev") {
          return false;
        } else if (process.env.NODE_ENV === "prod") {
          return true;
        }
      },
    },
  })
);
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`listening on port ${PORT}!`);
});
