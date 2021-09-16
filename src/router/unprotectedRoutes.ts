import { SwaggerRouter } from "koa-swagger-decorator";
import { general } from "../controller"

const unprotectedRouter = new SwaggerRouter()

unprotectedRouter.get('/', general.helloWorld)

unprotectedRouter.swagger({
  title: "o2o-koa-ts",
  description: "REST-API using KOA framework, , typescript. TypeORM for SQL with class-validators.",
  version: "0.0.1"
})

unprotectedRouter.mapDir(__dirname)

export { unprotectedRouter }