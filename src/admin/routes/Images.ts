import { Router, Response, Request } from 'express'
import { imagesController } from '../controllers'

const imagesRouter = Router()

imagesRouter.get('/', imagesController.index)

export default imagesRouter