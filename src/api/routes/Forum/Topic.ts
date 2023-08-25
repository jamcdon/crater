import { Router, Request, Response } from 'express'
import * as controller from '../../controllers/forum/topic'
import { getUserToken } from '../../../frontend/controllers/common'
import { ForumTopicInput } from '../../../db/nosql/models/ForumTopic'

const forumTopicRouter = Router()

forumTopicRouter.post('/', async (req: Request, res: Response) => {
    const userToken = await getUserToken(req)
    if (userToken[1] != undefined){
        const payload: ForumTopicInput = {
            title: req.body.title,
            description: req.body.description,
            active: false,
            promoterUserID: userToken[1],
            admins: undefined,
            stars: 0,
            posts: 0
        }
        
        const result = await controller.create(payload)
        console.log(result)
        if (result != undefined){
            return res.status(200).json(result)
        }
        return res.status(400).json({error: "Topic not created"})
    }
    return res.status(401).json({error: "User not logged in. Unable to create new topic"})
})

forumTopicRouter.patch('/promote/:id', async(req: Request, res: Response) => {
    const userToken = await getUserToken(req)
    if (userToken[2] == true && userToken[1] != undefined){
        const topic = await controller.getById(req.params.id)
        if (topic != undefined){
            const result = await controller.promote(req.params.id, userToken[1])
            if (result != undefined){
                return res.status(200).json(result)
            }
            return res.status(400).json({error: "unable to promote topic"})
        }
        return res.status(400).json({error: "unable to promote topic; topic not found."})
    }
    return res.status(401).json({error: "User must be an administrator. Unable to promote topic."})
})

forumTopicRouter.get('/paginate/popular/:page', async(req: Request, res: Response) => {
    const page: number = parseInt(req.params.page)
    if (!Number.isNaN(page)){
        const topics = await controller.paginatePopularity(page)
        if (topics != undefined){
            return res.status(200).json(topics)
        }
        return res.status(400).json({error: "resulted undefined"})
    }
    return res.status(400).json({error: "paginate requires page paramter to be a number"})
})

forumTopicRouter.get('/paginate/inactive/:page', async(req: Request, res: Response) => {
    const page: number = parseInt(req.params.page)
    if (!Number.isNaN(page)){
        const topics = await controller.paginateInactive(page)
        if (topics != undefined){
            return res.status(200).json(topics)
        }
        return res.status(400).json({error: "resulted undefined"})
    }
    return res.status(400).json({error: "paginate requires page paramter to be a number"})
})

export default forumTopicRouter