import { Router, Request, Response } from 'express'
import { composeController } from '../controllers'

const composeRouter = Router()

composeRouter.get('/', composeController.index)
composeRouter.get('/new', composeController.new)
composeRouter.get('/edit', composeController.edit)

export default composeRouter