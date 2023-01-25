import { Router } from 'express'
import { homeController } from '../controllers'

const homeRouter = Router()

homeRouter.get('/', homeController.index)

export default homeRouter