import { Router, Request, Response } from 'express'
import { logsController } from '../controllers'

const logsRouter = Router()
logsRouter.get('/', logsController.index)

export default logsRouter