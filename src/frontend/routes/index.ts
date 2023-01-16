import { Router, Request, Response } from 'express'
import { nextTick } from 'process'
import aboutRouter from './about'
import accountRouter from './account'
import featuresRouter from './features'
import homeRouter from './home'
import imageRouter from './images'
import signRouter from './sign'
import trendingRouter from './trending'
import composeRouter from './compose'
import errorRouter from './error'

const frontEndRouter = Router()

frontEndRouter.use('/', homeRouter)
frontEndRouter.use('/about', aboutRouter)
frontEndRouter.use('/account', accountRouter)
frontEndRouter.use('/compose', composeRouter)
frontEndRouter.use('/features', featuresRouter)
frontEndRouter.use('/images', imageRouter)
frontEndRouter.use('/sign', signRouter)
frontEndRouter.use('/trending', trendingRouter)
frontEndRouter.use(errorRouter)

export default frontEndRouter