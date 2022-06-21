import { Router, Request, Response } from 'express'

const imageRouter = Router()

imageRouter.get('/:name', async (req: Request, res: Response) => {
    // get router by image name
    const image = String(req.params.image)
})

imageRouter.put('/:id', async (req: Request, res: Response) => {
    // update image by image id
    const id = Number(req.params.id)
})

imageRouter.delete('/:id', async (req: Request, res: Response) => {
    //delete image by id
    const id = Number(req.params.id)
})

imageRouter.post('/', async (req: Request, res: Response) => {
    //create image
})

export default imageRouter