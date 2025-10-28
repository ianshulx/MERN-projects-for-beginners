import "dotenv/config";
import "./config/passport.config.js";
import express, { type NextFunction, type Request,type Response } from "express";
import cors from "cors";
import passport from "passport";
import { Env } from "./config/env.config.js";
import { HTTPSTATUS } from "./config/http.config.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { BadRequestException } from "./utils/app-error.js";
import { asyncHandler } from "./middlewares/asyncHandler.middlerware.js";
import connctDatabase from "./config/database.config.js";
import authRoutes from "./routes/auth.route.js";
import { passportAuthenticateJwt } from "./config/passport.config.js";
import userRoutes from "./routes/user.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import { initializeCrons } from "./cron/index.js";
import reportRoutes from "./routes/report.route.js";
import { getDateRange } from "./utils/date.js";
import analyticsRoutes from "./routes/analytics.route.js";

const app = express();
const BASE_PATH = Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException("This is a test error");
    res.status(HTTPSTATUS.OK).json({
      message: "Hello Subcribe to the channel",
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, passportAuthenticateJwt, userRoutes);
app.use(`${BASE_PATH}/transaction`, passportAuthenticateJwt, transactionRoutes);
app.use(`${BASE_PATH}/report`, passportAuthenticateJwt, reportRoutes);
app.use(`${BASE_PATH}/analytics`, passportAuthenticateJwt, analyticsRoutes);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connctDatabase();

  if (Env.NODE_ENV === "development") {
    await initializeCrons();
  }

  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
