import { Router } from 'express'
import * as Views from './home'
import homeRouter from './home'

const frontEndRouter = Router()

frontEndRouter.use('/', homeRouter)


export default frontEndRouter