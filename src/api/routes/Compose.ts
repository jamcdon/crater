import { Router, Response, Request } from 'express'
import {
    CreateComposeDTO
} from '../dto/compose.dto'
import { getUserToken } from '../../frontend/controllers/common'
import * as composeController from '../controllers/compose'
import * as imageController from '../controllers/image'

const composeRouter = Router()

composeRouter.get('/id/:id', async(req: Request, res: Response) => {
    // get compose script by id
    const compose = await composeController.getById(req.params.id)
    if (compose != undefined){
        return res.status(200).send(compose)
    }
    return res.status(400).send(`"Error": "Compose ${req.params.id} not found."`)
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
            manifest: false,
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

composeRouter.get('/paginate/popular/:page', async(req: Request, res: Response) => {
    const page: number = parseInt(req.params.page)
    if (!Number.isNaN(page)){
        const pageComposes = await composeController.paginatePopularity(page)
        if (pageComposes != undefined){
            return res.status(200).json(pageComposes)
        }
        return res.status(400).send('{"Error": "Results undefined"}')
    }
    return res.status(400).send(`{"Error": "Paginate requires page parameter to be a number, '${req.params.page}' provided"}`)
})

composeRouter.get('/paginate/name/:imageName/:page', async(req: Request, res: Response) => {
    // get paginated compose scripts by imageName 
})

composeRouter.get('/download/:id/docker-compose.yml', async (req: Request, res: Response) => {
    const composeYaml = await composeController.createRaw(req.params.id)
    if (composeYaml != undefined){
        res.set({"Content-Disposition": "attachment; filename=\"docker-compose.yml\""})
        return res.status(200).send(composeYaml)
    }
    return res.status(400).send(`"Error": "${req.params.id} not found."`)
})

composeRouter.get('/raw/:id/docker-compose.yml', async (req: Request, res: Response) => {
    const composeYaml = await composeController.createRaw(req.params.id)
    if (composeYaml != undefined){
        const isFirefox = req.get('User-Agent')?.includes("Firefox")
        if (isFirefox){
            res.set({"Content-Type": "text/plain"})
        }
        else {
            res.set({"Content-Type": "text/yaml"})
        }
        res.set({"Content-Disposition": "inline; filename=\"docker-compose.yml\""})
        return res.status(200).send(composeYaml)
    }
    return res.status(400).send(`"Error": "${req.params.id} not found."`)
})

export default composeRouter