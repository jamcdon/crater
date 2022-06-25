import { Router } from 'express'
import aboutRouter from './about'
import accountRouter from './account'
import featuresRouter from './features'
import homeRouter from './home'
import imageRouter from './images'
import signRouter from './sign'
import trendingRouter from './trending'

const frontEndRouter = Router()

frontEndRouter.use('/', homeRouter)
frontEndRouter.use('/about', aboutRouter)
frontEndRouter.use('/account', accountRouter)
frontEndRouter.use('/features', featuresRouter)
frontEndRouter.use('/images', imageRouter)
frontEndRouter.use('/sign', signRouter)
frontEndRouter.use('/trending', trendingRouter)

export default frontEndRouter