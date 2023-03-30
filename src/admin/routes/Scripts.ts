import { Router, Response, Request } from 'express'
import { scriptsController } from '../controllers'

const scriptsRouter = Router()

scriptsRouter.get('/', scriptsController.index)

export default scriptsRouter