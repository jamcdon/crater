import { Router } from 'express'
import forumCommentRouter from './Comment'
import forumPostRouter from './Post'
import forumTopicRouter from './Topic'

const forumRouter = Router()
forumRouter.use('/comment', forumCommentRouter)
forumRouter.use('/post', forumPostRouter)
forumRouter.use('/topic', forumTopicRouter)

export default forumRouter