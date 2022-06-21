import { Router, Response, Request, request } from 'express'

const composeRouter = Router()

composeRouter.get('/:id', async (req: Request, res: Response) => {
    // get compose script by id
    const id = Number(req.params.id)
})

composeRouter.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
})

composeRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
})

composeRouter.post('/:imageID', async(req: Request, res: Response) => {
    const imageID = Number(req.params.imageID)
})

export default composeRouter