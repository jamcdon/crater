import { Router, Request, Response } from 'express'
import { homeController } from '../controllers'

const homeRouter = Router()

homeRouter.get('/', homeController.index)

export default homeRouter