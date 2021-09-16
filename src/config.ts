import dotenv from "dotenv"

dotenv.config({ path: ".env" })

export interface Config {
  port: number;
  debugLoggin: boolean,
  dbsslconn: boolean,
  databaseUrl: string;
  dbEntitiesPath: string[];
}

const isDevMode = process.env.NODE_ENV == "development"

const config: Config = {
  port: +(process.env.PORT || 3000),
  debugLoggin: isDevMode,
  dbsslconn: !isDevMode,
  databaseUrl: process.env.DATABASE_URL || "mariadb://root:my-secret-pw@localhost:3306/o2o",
  dbEntitiesPath: [
    ...isDevMode ? ["src/entity/**/*.ts"] : ["dist/entity/**/*.js"],
  ]
}

export { config }