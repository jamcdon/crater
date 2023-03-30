import { Router, Response, Request } from 'express'
import { usersController } from '../controllers'

const usersRouter = Router()

usersRouter.get('/', usersController.index)

export default usersRouter