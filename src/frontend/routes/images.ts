import { Router } from 'express'
import { imageController } from '../controllers'

const imageRouter = Router()

imageRouter.get('/', imageController.index)
imageRouter.get('/view/:imageName', imageController.view)
imageRouter.get('/new', imageController.new)
imageRouter.get('/search/:query/:page', imageController.search)

export default imageRouter