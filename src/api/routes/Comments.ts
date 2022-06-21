import { Router, Request, Response } from 'express'

const commentsRouter = Router()

commentsRouter.get('/:composeID', async(req: Request, res: Response) => {
    //get all comments by composeID
    const composeID = Number(req.params.composeID)
})

commentsRouter.put('/:id', async(req: Request, res: Response) => {
    // update comment by id
    const id = Number(req.params.id)
})

commentsRouter.delete('/:id', async(req: Request, res: Response) => {
    // delete comment by id
    const id = Number(req.params.id)
})

commentsRouter.post('/:composeID', async(req: Request, res: Response) => {
    // create a comment by composeID
    const composeID = Number(req.params.composeID)
})

export default commentsRouter