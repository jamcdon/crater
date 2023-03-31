import { Router } from 'express'
import { imageController } from '../controllers'

const imageRouter = Router()

imageRouter.get('/', imageController.index)
imageRouter.get('/view/:imageName', imageController.view)
imageRouter.get('/new', imageController.new)

export default imageRouter