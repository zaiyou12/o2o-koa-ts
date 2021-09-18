import Koa from "koa";
import "reflect-metadata";
import cors from "@koa/cors";
import winston from "winston";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import { createConnection, ConnectionOptions } from "typeorm";

import { logger } from "./logger";
import { config } from "./config";
import { unprotectedRouter } from "./router/unprotectedRoutes";

const connectionOptions: ConnectionOptions = {
  type: "mariadb",
  url: config.databaseUrl,
  synchronize: true,
  logging: false,
  entities: config.dbEntitiesPath,
  ssl: config.dbsslconn,
  extra: {},
};

createConnection(connectionOptions)
  .then(async () => {
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
          imgSrc: [
            "'self'",
            "data:",
            "online.swagger.io",
            "validator.swagger.io",
          ],
        },
      })
    );

    // Enable cors with default options
    app.use(cors());

    // Logger middleware -> use winston as logger (logger.ts with config)
    app.use(logger(winston))

    // Enable bodyParser with default options
    app.use(bodyParser());
    // these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

    app.listen(config.port, () => {
      console.log(`Koa server is listeng on port ${config.port}`);
    });
  })
  .catch((error: string) => console.log("TypeORM connection error: ", error));
