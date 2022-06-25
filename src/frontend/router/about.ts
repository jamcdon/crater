import { Router, Request, Response } from 'express'
import { aboutController } from '../controllers'

const aboutRouter = Router()

aboutRouter.get('/', aboutController.index)

export default aboutRouter