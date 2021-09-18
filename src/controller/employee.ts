import { validate, ValidationError } from "class-validator";
import { Context } from "koa";
import { request, responsesAll, summary, tagsAll, path, body } from "koa-swagger-decorator";
import { Equal, getManager, Not, Repository } from "typeorm";

import { Employee, employeeSchema } from "../entity/employee";

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

    // load employee by id
    const employeeRepository: Repository<Employee> = getManager().getRepository(Employee)
    const employee: Employee | undefined = await employeeRepository.findOne(+ctx.params.id || 0)

    if (employee) {
      // return loaded employee object
      ctx.status = 200
      ctx.body = employee
    } else {
      // employee not exist error
      ctx.status = 404
      ctx.body = "The employee you are trying to retrieve doesn't exit in the db"
    }
  }

  @request("post", '/employee')
  @summary("Create an employee")
  @body(employeeSchema)
  public static async createEmployee(ctx: Context): Promise<void> {

    const employeeRepository: Repository<Employee> = getManager().getRepository(Employee)
    
    // build up entity employee to be saved
    const employeeToBeSaved: Employee = new Employee()
    employeeToBeSaved.name = ctx.request.body.name
    employeeToBeSaved.email = ctx.request.body.email

    // validate employee entity
    const errors: ValidationError[] = await validate(employeeToBeSaved)

    if (errors.length > 0) {
      // return 400 status code and error message
      ctx.status = 400
      ctx.body = errors
    } else if (await employeeRepository.findOne({ email: employeeToBeSaved.email})) {
      // email already exists error
      ctx.status = 400
      ctx.body = "The specified e-mail address already exists"
    } else {
      // save the user contained in the POST body
      const employee = await employeeRepository.save(employeeToBeSaved)
      ctx.status = 201;
      ctx.body = employee
    }
  }

  @request("put", "/employee/{id}")
  @summary("Update an employee")
  @path({
    id: { type: "number", required: true, description: "id of employee"}
  })
  @body(employeeSchema)
  public static async updateEmployee(ctx: Context): Promise<void> {

    const employeeRepository: Repository<Employee> = getManager().getRepository(Employee)
    
    // update the employee by specified id
    // build up entity employee to be updated
    const employeeToBeUpdated: Employee = new Employee()
    employeeToBeUpdated.id = +ctx.params.id || 0
    employeeToBeUpdated.name = ctx.request.body.name
    employeeToBeUpdated.email = ctx.request.body.email

    // validate employee entity
    const errors: ValidationError[] = await validate(employeeToBeUpdated)

    if (errors.length > 0) {
      // return 400 status code and errors array
      ctx.status = 400
      ctx.body = errors
    } else if (!await employeeRepository.findOne(employeeToBeUpdated.id)) {
      // cehck if a employee with the specified id exists
      ctx.status = 400
      ctx.body = "The employee you are trying to update doesn't exist in the db"
    } else if (await employeeRepository.findOne({ id: Not(Equal(employeeToBeUpdated.id)), email: employeeToBeUpdated.email})) {
      // email already exist error
      ctx.status = 400
      ctx.body = "The specified e-mail address already exists"
    }
  }
}
