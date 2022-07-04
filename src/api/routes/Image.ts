import { Router, Request, Response } from 'express'
import * as imageController from '../controllers/image'
import { CreateImageDTO, UpdateImageDTO } from '../dto/image.dto'

const imageRouter = Router()

imageRouter.get('/name/:imageName', async (req: Request, res: Response) => {
    // get router by image name
    const image = String(req.params.imageName)

    const result = await imageController.getByImageName(image)
    return res.status(200).send(result)
})

imageRouter.get('/:id', async (req: Request, res: Response) => {
    // get router by image name
    const id = String(req.params.image)

    const result = await imageController.getById(id)
    return res.status(200).send(result)
})

imageRouter.put('/:id', async (req: Request, res: Response) => {
    // update image by image id
    const id = String(req.params.id)
    const payload:UpdateImageDTO = req.body

    const result = await imageController.update(id, payload)
    return res.status(201).send(result)
})

imageRouter.delete('/:id', async (req: Request, res: Response) => {
    //delete image by id
    const id = String(req.params.id)

    const result = await imageController.deleteById(id)
    return res.status(204).send({
        success: result
    })
})

imageRouter.post('/', async (req: Request, res: Response) => {
    //create image

    const payload:CreateImageDTO = req.body

    const results = await imageController.create(payload)
    return res.status(200).send(results)
})

imageRouter.get('/paginate', async (req: Request, res: Response) => {
    //get paginated images by amount of composes
})

export default imageRouter