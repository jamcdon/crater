import { Router, Request, Response } from 'express'
import { trendingController } from '../controllers'

const featuresRouter = Router()

featuresRouter.get('/', trendingController.index)

export default featuresRouter