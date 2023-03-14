import { Router, Request, Response } from 'express'
import * as tagController from '../controllers/tag'

const tagRouter = Router()

tagRouter.get('/paginate/:page', async (req: Request, res: Response) => {
    const page: number = parseInt(req.params.page)
    if (!Number.isNaN(page)){
        const pageTags = await tagController.paginateNameOnly(page)
        console.log(pageTags)
        if (pageTags != undefined){
            return res.status(200).json(pageTags)
        }
        return res.status(400).send('"Error": "Result undefined"')
    }
    return res.status(400).send(`"Error": "Paginate requires page parameter to be a number, '${req.params.page}' provided"`)
})

export default tagRouter