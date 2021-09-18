import Router from "@koa/router"
import { general, employee } from "../controller"

const unprotectedRouter = new Router()

unprotectedRouter.get('/', general.helloWorld)

export { unprotectedRouter }