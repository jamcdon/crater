import { Router, Request, Response } from 'express'
import { featuresController } from '../controllers'

const featuresRouter = Router()

featuresRouter.get('/', featuresController.index)
featuresRouter.get('/glance', featuresController.glance)
featuresRouter.get('/submissions', featuresController.submissions)

export default featuresRouter