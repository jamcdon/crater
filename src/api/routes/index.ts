import { Router } from 'express'
import userRouter from './User'
import imageRouter from './Image'
import commentsRouter from './Comments'
import composeRouter from './Compose'


const router = Router()

router.use('/user', userRouter)
router.use('/image', imageRouter)
router.use('/comments', commentsRouter)
router.use('/compose', composeRouter)


export default router