import { Router } from 'express'
import { errorController } from '../controllers'

const errorRouter = Router()

errorRouter.use(errorController.index)

export default errorRouter