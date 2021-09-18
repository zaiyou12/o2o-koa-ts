import { Context } from "koa";
import { request, responsesAll, summary, tagsAll } from "koa-swagger-decorator";
import { Employee } from "../entity/employee";
import { getManager, Repository } from "typeorm";

@responsesAll({ 200: { description: "success" }, 400: { description: "bad request" }, 401: { description: "unauthorized, missing/wrong jwt token" }})
@tagsAll(["User"])
export default class EmployeeController {

  @request("get", "/users")
  @summary("Find all users")
  public static async getUsers(ctx: Context):Promise<void> {
    const employeeRepository: Repository<Employee> = getManager().getRepository(Employee)
    const employee: Employee[] = await employeeRepository.find()

    ctx.status = 200
    ctx.body = employee
  }
}
