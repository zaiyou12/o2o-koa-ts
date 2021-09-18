import Koa from "koa";
import "reflect-metadata";
import jwt from "koa-jwt";
import cors from "@koa/cors";
import winston from "winston";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";

import { logger } from "./logger";
import { protectedRouter } from "../protectedRoutes";
import { unprotectedRouter } from "../unprotectedRoutes";
import { config } from "../config";

const app = new Koa();

// Provides important security headers to make your app more secure
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "cdnjs.cloudflare.com",
        "fonts.googleapis.com",
      ],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "online.swagger.io", "validator.swagger.io"],
    },
  })
);

// Enable cors with default options
app.use(cors());

// Logger middleware -> use winston as logger (logger.ts with config)
app.use(logger(winston));

// Enable bodyParser with default options
app.use(bodyParser());

// these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

// JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
// do not protect swagger-json and swagger-html endpoints
app.use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] }))

app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

export default app;