import { Router } from 'express'
import aboutRouter from './about'
import accountRouter from './account'
import featuresRouter from './features'
import homeRouter from './home'
import imageRouter from './images'
import signRouter from './sign'
import trendingRouter from './trending'

const frontEndRoutes = Router()

frontEndRoutes.use('/', homeRouter)
frontEndRoutes.use('/about', aboutRouter)
frontEndRoutes.use('/account', accountRouter)
frontEndRoutes.use('/features', featuresRouter)
frontEndRoutes.use('/images', imageRouter)
frontEndRoutes.use('/sign', signRouter)
frontEndRoutes.use('/trending', trendingRouter)

export default frontEndRoutes