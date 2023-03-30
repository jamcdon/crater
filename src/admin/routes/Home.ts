import { Router, Response, Request } from 'express'
import { homeController } from '../controllers'

const imagesRouter = Router()

imagesRouter.get('/', homeController.index)
imagesRouter.post('/authenticate/', homeController.authenticate)

export default imagesRouter