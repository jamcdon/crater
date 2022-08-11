import { Router, Request, Response } from 'express'
import userRouter from './User'
import imageRouter from './Image'
import commentsRouter from './Comments'
import composeRouter from './Compose'
import errorRouter from './Error'

const apiRouter = Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/image', imageRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/compose', composeRouter)
apiRouter.use(errorRouter)


export default apiRouter