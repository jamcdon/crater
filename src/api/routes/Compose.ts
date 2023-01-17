import { Router, Response, Request, request } from 'express'
import {
    CreateComposeDTO
} from '../dto/compose.dto'
import { getUserToken } from '../../frontend/controllers/common'
import * as composeController from '../controllers/compose'
import * as imageController from '../controllers/image'

const composeRouter = Router()

composeRouter.get('/:id', async(req: Request, res: Response) => {
    // get compose script by id
    const id = Number(req.params.id)
})

composeRouter.get('/view/:username/', async(req: Request, res: Response) => {
    // I think this should be in the frontend ... 
    // get compose scripts by username, imageName
    const username = String(req.params.username) 
    //const result = await composeController.getByUserImage(username)
    // TODO
})

composeRouter.get('/')

composeRouter.put('/:id', async(req: Request, res: Response) => {
    // update compose script by id
    const id: string = req.params.id
})

composeRouter.delete('/:id', async(req: Request, res: Response) => {
    // delete compose script by id
    const id = Number(req.params.id)
})

composeRouter.post('/', async(req: Request, res: Response) => {
    // create new compose entry
    const [authorName, authorID] = await getUserToken(req)
    const imageObject = await imageController.getByImageName(req.body.imageName)
    if (authorID != undefined && imageObject != undefined) {
        const payload: CreateComposeDTO = {
            title: req.body.title,
            authorID: authorID,
            imageName: imageObject.name,
            imageID: imageObject._id,
            tags: req.body.tags,
            public: req.body.public,
            yaml: req.body.yaml,
            stars: 0
        }

        const results = await composeController.create(payload)
        if (results != undefined){
            return res.status(200).send(results)
        }
        return res.status(400).send('"Error": "Image for compose not created"')
    }
    else if (authorName == undefined){
        return res.status(401).send('"Error": "User not logged in. Unable to create new compose entry"')
    }
    return res.status(400).send('"Error": "Image for compose not created."')
})

composeRouter.get('/:imageName/pagination', async(req: Request, res: Response) => {
    // get paginated compose scripts by imageName 
})

export default composeRouter