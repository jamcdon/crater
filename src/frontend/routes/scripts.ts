import { Router } from 'express'
import { composeController, manifestController, scriptsController } from '../controllers'

const scriptsRouter = Router()

scriptsRouter.get('/', scriptsController.index)

scriptsRouter.use('/compose/new', composeController.new)
scriptsRouter.use('/compose/edit', composeController.edit)

scriptsRouter.use('/manifest/new', manifestController.new)
scriptsRouter.use('/manifest/edit', manifestController.edit)

export default scriptsRouter