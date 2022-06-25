import { Router, Request, Response } from 'express'
import { imageController } from '../controllers'

const imageRouter = Router()

imageRouter.get('/', imageController.index)

export default imageRouter