import { Router } from 'express'
import aboutRouter from './about'
import featuresRouter from './features'
import homeRouter from './home'
import imageRouter from './image'
import trendingRouter from './trending'

const frontEndRouter = Router()

frontEndRouter.use('/', homeRouter)
frontEndRouter.use('/trending', trendingRouter)
frontEndRouter.use('/image', imageRouter)
frontEndRouter.use('/popular', featuresRouter)
frontEndRouter.use('/about', aboutRouter)

export default frontEndRouter