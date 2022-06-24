import { Router, Request, Response } from 'express'
import { featuresController } from '../controllers'

const featuresRouter = Router()

featuresRouter.get('/', featuresController.index)

export default featuresRouter