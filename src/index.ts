import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { createConnection, ConnectionOptions } from "typeorm"
import "reflect-metadata"

import { config } from "./config"
import { unprotectedRouter } from "./router/unprotectedRoutes"

const connectionOptions: ConnectionOptions = {
  type: "mariadb",
  url: config.databaseUrl,
  synchronize: true,
  logging: false,
  entities: config.dbEntitiesPath,
  ssl: config.dbsslconn,
  extra: {}
}

createConnection(connectionOptions).then(async () => {
  const app = new Koa()
  // Enable bodyParser with default options
  app.use(bodyParser())
  // these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
  app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods())
  
  app.listen(config.port, ()=> {
    console.log(`Koa server is listeng on port ${config.port}`)
  })
}).catch((error: string) => console.log("TypeORM connection error: ", error))
