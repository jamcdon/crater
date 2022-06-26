import {Router, Request, Response} from 'express'
import {signController} from '../controllers'

const signRouter = Router()

signRouter.get('/', signController.index)
signRouter.get('/in', signController.in)
signRouter.get('/in/forgot', signController.in_forgot)
signRouter.get('/out', signController.out)
signRouter.get('/up', signController.up)

export default signRouter