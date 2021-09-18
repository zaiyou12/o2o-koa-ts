import { SwaggerRouter } from "koa-swagger-decorator";
import { general, employee } from "../controller"

const unprotectedRouter = new SwaggerRouter()

unprotectedRouter.get('/', general.helloWorld)
unprotectedRouter.get('/employee', employee.fetchEmployee)
unprotectedRouter.get('/employee/:id', employee.getEmployee)

unprotectedRouter.swagger({
  title: "o2o-koa-ts",
  description: "REST-API using KOA framework, , typescript. TypeORM for SQL with class-validators.",
  version: "0.0.2"
})

unprotectedRouter.mapDir(__dirname)

export { unprotectedRouter }