import { Router, Request, Response } from 'express'
import * as manifestController from '../controllers/manifest'
import { getUserToken } from '../../frontend/controllers/common'
import * as imageController from '../controllers/image'
import { CreateComposeDTO } from '../dto/compose.dto'

const manifestRouter = Router()

manifestRouter.post('/', async(req: Request, res: Response) => {
    const [authorName, authorID] = await getUserToken(req)
    const imageObject = await imageController.getByImageName(req.body.imageName)
    if (authorID != undefined && imageObject != undefined) {
        const payload: CreateComposeDTO = {
            title: req.body.title,
            authorID: authorID,
            manifest: true,
            imageName: imageObject.name,
            imageID: imageObject._id,
            tags: req.body.tags,
            public: req.body.public,
            yaml: req.body.yaml,
            yamlTitle: req.body.yamlTitle,
            yamls: req.body.yamls,
            stars: 0
        }

        const results = await manifestController.create(payload)
        if (results != undefined){
            return res.status(200).send(results)
        }
        return res.status(400).send('"Error": "Manifest not created"')
    }
    else if (authorName == undefined){
        return res.status(401).send('"Error": "User not logged in. Unable to create new manifest entry"')
    }
    return res.status(400).send('"Error": "Image for manifest not created."')

})

manifestRouter.get('/paginate/popular/:page', async(req: Request, res: Response) => {
    const page: number = parseInt(req.params.page)
    if (!Number.isNaN(page)){
        const manifests = await manifestController.paginatePopularity(page)
        if (manifests != undefined){
            return res.status(200).json(manifests)
        }
        return res.status(400).json({Error: "Results undefined"})
    }
    return res.status(400).json({Error: `Paginate requres page paramter to be a number, ${req.params.page} provided`})
})

export default manifestRouter