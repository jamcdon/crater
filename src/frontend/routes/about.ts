import { Router, Request, Response } from 'express'
import { aboutController } from '../controllers'

const aboutRouter = Router()

aboutRouter.get('/', aboutController.index)
aboutRouter.get('/team', aboutController.team)
aboutRouter.get('/features/submissions', aboutController.submissions)
aboutRouter.get('/features/glance', aboutController.glance)

export default aboutRouter