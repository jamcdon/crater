import { Router, Request, Response } from 'express'
import * as manifestController from '../controllers/manifest'
import { CreateManifestDTO } from '../dto/manifest.dto'
import { getUserToken } from '../../frontend/controllers/common'
import * as imageController from '../controllers/image'

const manifestRouter = Router()

manifestRouter.post('/', async(req: Request, res: Response) => {
    const [authorName, authorID] = await getUserToken(req)
    const imageObject = await imageController.getByImageName(req.body.imageName)
    if (authorID != undefined && imageObject != undefined) {
        const payload: CreateManifestDTO = {
            title: req.body.title,
            authorID: authorID,
            imageName: imageObject.name,
            imageID: imageObject._id,
            tags: req.body.tags,
            public: req.body.public,
            yamls: req.body.yamls,
            stars: 0
        }

        const results = await manifestController.create(payload)
        if (results != undefined){
            return res.status(200).send(results)
        }
        return res.status(400).send('"Error": "Image for manifest not created"')
    }
    else if (authorName == undefined){
        return res.status(401).send('"Error": "User not logged in. Unable to create new manifest entry"')
    }
    return res.status(400).send('"Error": "Image for manifest not created."')

})

export default manifestRouter