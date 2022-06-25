import { Router } from 'express'
import aboutRouter from './about'
import featuresRouter from './features'
import homeRouter from './home'
import imageRouter from './images'
import trendingRouter from './trending'

const frontEndRouter = Router()

frontEndRouter.use('/', homeRouter)
frontEndRouter.use('/trending', trendingRouter)
frontEndRouter.use('/images', imageRouter)
frontEndRouter.use('/features', featuresRouter)
frontEndRouter.use('/about', aboutRouter)

export default frontEndRouter