import { unprotectedRouter } from "./router/unprotectedRoutes"

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const port: number = 3000

app.use(bodyParser())

app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods())

app.listen(port, ()=> {
  console.log(`Koa server is listeng on port ${port}`)
})