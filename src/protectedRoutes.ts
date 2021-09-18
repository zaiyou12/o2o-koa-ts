import { SwaggerRouter } from "koa-swagger-decorator";
import { employee } from "./controller"

const protectedRouter = new SwaggerRouter()

protectedRouter.get('/employee', employee.fetchEmployee)
protectedRouter.get('/employee/:id', employee.getEmployee)
protectedRouter.post('/employee', employee.createEmployee)
protectedRouter.put('/employee/:id', employee.updateEmployee)

protectedRouter.swagger({
  title: "o2o-koa-ts",
  description: "REST-API using KOA framework, , typescript. TypeORM for SQL with class-validators.",
  version: "0.0.2"
})

protectedRouter.mapDir(__dirname)

export { protectedRouter }