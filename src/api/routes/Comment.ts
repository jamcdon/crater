import { Router, Request, Response } from 'express'
import { getUserToken } from '../../frontend/controllers/common'
import { CreateCommentDTO } from '../dto/comment.dto'
import * as controller from '../controllers/comment'

const commentsRouter = Router()

commentsRouter.get('/compose/:composeID', async(req: Request, res: Response) => {
    //get all comments by composeID
    const composeID = Number(req.params.composeID)
})

commentsRouter.put('/upvote/:commentID', async(req: Request, res: Response) => {
    const userToken = await getUserToken(req)

    //TODO - check if user has already upvoted and put in additional logic

    if (userToken[1] != undefined){
        const upvotes = await controller.upvoteDownvote(req.params.commentID, req.body.upvote, userToken[1])
        if (upvotes != undefined){
            return res.status(200).send(`{"upvotes": ${upvotes}}`)
        }
        return res.status(400).send('{"Error": "Unable to upvote/downvote comment"}')
    }
    return res.status(401).send('{"Error": "User not logged in. Unable to create new comment."}')
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
    const userToken = await getUserToken(req)
    if (userToken[1] != undefined){
        const payload: CreateCommentDTO = {
            composeID: req.params.composeID,
            user: userToken[1],
            content: req.body.content,
            upvotes: 0
        }
        const result = controller.createComment(payload)
        if (payload != undefined){
            return res.status(200).json(result)
        }
        return res.status(400).send('{"Error": "Comment not created"}')
    }
    return res.status(401).send('{"Error": "User not logged in. Unable to create new comment."}')
    
})

export default commentsRouter