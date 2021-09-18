import {Employee} from '../src/entity/employee'

test("employee", () => {
  const employee = new Employee()
  employee.name = "Aaron"
  employee.email = "aaron.so@gmail.com"
  
  expect(employee.name).toBe("Aaron")
  expect(employee.email).toBe("aaron.so@gmail.com")
})