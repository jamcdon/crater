import { Router, Request, Response } from 'express'
import * as controller from '../../controllers/forum/comment'
import { getUserToken } from '../../../frontend/controllers/common'
import { ForumCommentInput } from '../../../db/nosql/models/ForumComment'
import * as postController from '../../controllers/forum/post'

const forumCommentRouter = Router()

forumCommentRouter.post('/:postID', async(req: Request, res: Response) => {
    const userToken = await getUserToken(req)
    const postID = req.params.postID

    if (userToken[1] != undefined){
        const post = await postController.getById(postID)
        if (post != undefined){
            const payload: ForumCommentInput = {
                postID: postID,
                content: req.body.content,
                upvotes: 0,
                commenterID: userToken[1],
                edited: false
            }
            const result = await controller.create(payload)
            if (result != undefined){
                return res.status(200).json(result)
            }
            return res.status(400).json({error: "Post does not exist"})
        }
        return res.status(400).json({error: "Comment not created"})
    }
    return res.status(401).json({error: "User not logged in. Unable to create new comment"})
})

forumCommentRouter.get('/post/paginate/:postID/:page', async(req: Request, res: Response) => {
    const postID = req.params.postID
    const page: number = parseInt(req.params.page)

    if (!Number.isNaN(page)){
        const postComments = await controller.getPaginated(postID, page)
        if (postComments != undefined){
            return res.status(200).json(postComments)
        }
        return res.status(400).json({error: "Results undefined"})
    }
    return res.status(400).json({error: "Request parameters require page to be provided"})
})

forumCommentRouter.put('/:id', async(req: Request, res: Response) => {
    const id = req.params.id
    const userToken = await getUserToken(req)
    const content = req.body.content

    if (userToken[1] != undefined){
        const comment = await controller.updateById(id, userToken[1], content)
        if (comment != undefined){
            return res.status(200).json(comment)
        }
        return res.status(400).json(comment)
    }
    return res.status(401).json({error: "User not logged in. Unable to update comment"})
})

forumCommentRouter.delete('/:id', async(req: Request, res: Response) => {
    const id = req.params.id
    const userToken = await getUserToken(req)

    if (userToken[1] != undefined){
        const deleted = await controller.deleteComment(id, userToken[1])
        if (deleted == true){
            return res.status(200).json({status: "deleted"})
        }
        return res.status(400).json({status: "not deleted", reason: "unable to check comment ID or ownership"})
    }
    return res.status(401).json({error: "user not logged in. Unable to delete comment."})
})

forumCommentRouter.put('/upvote/:commentID', async(req: Request, res: Response) => {
    const userToken = await getUserToken(req)
    const commentID = req.params.commentID
    const upvote: boolean = req.body.upvote

    if (userToken[1] != undefined){
        const alreadyUpvoted = await controller.checkIfUpvoted(commentID, userToken[1])

        const upvotes = await controller.upvoteDownvote(commentID, upvote, userToken[1], alreadyUpvoted)
        if (upvotes != undefined){
            return res.status(200).json({upvotes: upvotes})
        }
        return res.status(400).json({status: "not updated", reason: "an error occured or you were not the auther of the comment"})
    }
    return res.status(401).json({error: "User not logged in. Unable to update comment"})
})

export default forumCommentRouter