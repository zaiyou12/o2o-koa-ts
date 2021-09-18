import { Context } from "koa";
import { request, responsesAll, summary, tagsAll, path } from "koa-swagger-decorator";
import { getManager, Repository } from "typeorm";

import { Employee } from "../entity/employee";

@responsesAll({ 200: { description: "success" }, 400: { description: "bad request" }, 401: { description: "unauthorized, missing/wrong jwt token" }})
@tagsAll(["Employee"])
export default class EmployeeController {

  @request("get", "/employee")
  @summary("Find all employee")
  public static async fetchEmployee(ctx: Context):Promise<void> {
    
    // load all employee
    const employeeRepository: Repository<Employee> = getManager().getRepository(Employee)
    const employee: Employee[] = await employeeRepository.find()

    // retrn OK stauts code and loaded employee array
    ctx.status = 200
    ctx.body = employee
  }

  @request("get", "/employee/{id}")
  @summary("Find employee by id")
  @path({
    id: { type: "number", required: true, description: "id of user"}
  })
  public static async getEmployee(ctx: Context): Promise<void> {


    const employeeRepository: Repository<Employee> = getManager().getRepository(Employee)
    const employee: Employee | undefined = await employeeRepository.findOne(+ctx.params.id || 0)

    if (employee) {
      ctx.status = 200
      ctx.body = employee
    } else {
      ctx.status = 400
      ctx.body = "The employee you are trying to retrieve doesn't exit in the db"
    }
  }
}
