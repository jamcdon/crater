import {Router, Request, Response} from 'express'
import {accountController} from '../controllers'

const accountRouter = Router()

accountRouter.get('/', accountController.index)

accountRouter.get('/logout/:status', accountController.logout)

accountRouter.get('/:username', accountController.user)

export default accountRouter