import { Router, Request, Response } from 'express'
import * as controller from '../../controllers/forum/post'
import * as topicController from '../../controllers/forum/topic'
import { getUserToken } from '../../../frontend/controllers/common'
import { ForumPostInput } from '../../../db/nosql/models/ForumPost'

const forumPostRouter = Router()

forumPostRouter.get('/id/:id', async(req: Request, res: Response) => {
    const id = req.params.id
    const post = await controller.getById(id)
    if (post != undefined){
        return res.status(200).json(post)
    }
    return res.status(400).json({error: `Post ${id} not found.`})
})

forumPostRouter.put('/:id', async(req: Request, res: Response) => {
    const id = req.params.id

})

forumPostRouter.delete('/:id', async(req: Request, res: Response) => {
    const id = req.params.id

})

forumPostRouter.get('/paginate/popular/:page', async(req: Request, res: Response) => {
    const page = parseInt(req.params.page)
    if (!Number.isNaN(page)){
        const posts = await controller.paginatePopularity(page)
        if (posts != undefined){
            return res.status(200).json(posts)
        }
        return res.status(400).json({error: "results undefined"})
    }
    return res.status(400).json({error: `paginate requires page parameter to be a number, ${req.params.page} provided`})
})

forumPostRouter.post('/:topicID', async(req: Request, res: Response) => {
    const userToken = await getUserToken(req)
    if (userToken[1] != undefined){
        const topicObject = await topicController.getById(req.params.topicID)
        if (topicObject != undefined){
            const payload: ForumPostInput = {
                title: req.body.title,
                content: req.body.content,
                upvotes: 0,
                posterUserID: userToken[1],
                topicID: topicObject._id.toString(),
                topicName: topicObject.title,
                tags: req.body.tags,
                views: 0
            }
            const result = await controller.create(payload)
            if (result != undefined){
                return res.status(200).json(result)
            }
            return res.status(400).json({error: "Error occured creating post."})
        }
        return res.status(400).json({error: "Error occured creating post. Topic not found."})
    }
    return res.status(401).json({error: "User not logged in. Unable to create new post."})
})

export default forumPostRouter