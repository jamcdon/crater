import { Router } from 'express'
import { forumController } from '../controllers'

const forumRouter = Router()

forumRouter.get('/', forumController.index)

export default forumRouter