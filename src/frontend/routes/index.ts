import { Router } from 'express'
import aboutRouter from './about'
import accountRouter from './account'
import forumRouter from './forum'
import homeRouter from './home'
import imageRouter from './images'
import signRouter from './sign'
import scriptsRouter from './scripts'
import errorRouter from './error'

const frontEndRouter = Router()

frontEndRouter.use('/', homeRouter)
frontEndRouter.use('/about', aboutRouter)
frontEndRouter.use('/account', accountRouter)
frontEndRouter.use('/forum', forumRouter)
frontEndRouter.use('/images', imageRouter)
frontEndRouter.use('/scripts', scriptsRouter)
frontEndRouter.use('/sign', signRouter)
frontEndRouter.use(errorRouter)

export default frontEndRouter