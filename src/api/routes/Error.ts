import { Router } from 'express'
import { errorController } from '../controllers/error'

const errorRouter = Router()

errorRouter.use(errorController.index)

export default errorRouter