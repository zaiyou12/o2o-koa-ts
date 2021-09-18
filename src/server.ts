import Koa from "koa";
import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";

import appInstance from './app'
import { config } from "./config";

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
    const app: Koa = appInstance;
    app.listen(config.port, () => {
      console.log(`Koa server is listeng on port ${config.port}`);
    });
  })
  .catch((error: string) => console.log("TypeORM connection error: ", error));
