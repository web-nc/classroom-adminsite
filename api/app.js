import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import createError from "http-errors";
import mongoose from "mongoose";
import logger from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import adminRouter from "./components/admin/admin.route.js";
import authRouter from "./components/auth/auth.route.js";
import courseRouter from "./components/course/course.route.js";
import userRouter from "./components/user/user.route.js";
import passport from "./modules/passport/index.js";
import indexRouter from "./routes/index.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

mongoose.connect(
  process.env.DATABASE_URL,
  function (err) {
    if (err) throw err;
    console.log("Connect to database successful!");
  },
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const whitelist = ["http://localhost:3003"];

app.use(
  cors({
    credentials: true,
    origin: [...whitelist, process.env.FRONTEND_URL],
  })
);
app.use(passport.initialize());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  adminRouter
);
app.use("/user", passport.authenticate("jwt", { session: false }), userRouter);
app.use(
  "/course",
  passport.authenticate("jwt", { session: false }),
  courseRouter
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Add the first admin user
//insert();

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
