import { Router } from 'express'
import userRouter from './User'
import imageRouter from './Image'
import commentsRouter from './Comments'
import composeRouter from './Compose'
import errorRouter from './Error'
import manifestRouter from './Manifest'
import tagRouter from './Tag'

const apiRouter = Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/image', imageRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/compose', composeRouter)
apiRouter.use('/manifest', manifestRouter)
apiRouter.use('/tags', tagRouter)
apiRouter.use(errorRouter)


export default apiRouter