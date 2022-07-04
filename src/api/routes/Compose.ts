import { Router, Response, Request, request } from 'express'

const composeRouter = Router()

composeRouter.get('/:id', async(req: Request, res: Response) => {
    // get compose script by id
    const id = Number(req.params.id)
})

composeRouter.get('/image/:imageName', async(req: Request, res: Response) => {
    // get compose scripts by imageName
    const imageName = String(req.params.imageName)
})

composeRouter.get('/')

composeRouter.put('/:id', async(req: Request, res: Response) => {
    // update compose script by id
    const id = Number(req.params.id)
})

composeRouter.delete('/:id', async(req: Request, res: Response) => {
    // delete compose script by id
    const id = Number(req.params.id)
})

composeRouter.post('/', async(req: Request, res: Response) => {
    // create new compose entry
})

composeRouter.get('/:imageName/pagination', async(req: Request, res: Response) => {
    // get paginated compose scripts by imageName 
})

export default composeRouter