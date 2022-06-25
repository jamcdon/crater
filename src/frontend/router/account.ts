import {Router, Request, Response} from 'express'
import {accountController} from '../controllers'

const accountRouter = Router()

accountRouter.get('/', accountController.index)

export default accountRouter