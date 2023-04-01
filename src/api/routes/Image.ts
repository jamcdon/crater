import { Router, Request, Response } from 'express'
import { scrapeImage } from '../../db/blob/services/imageScraper'
import { getUserToken } from '../../frontend/controllers/common'
import * as imageController from '../controllers/image'
import { CreateImageDTO, UpdateImageDTO } from '../dto/image.dto'

const imageRouter = Router()

imageRouter.get('/name/:imageName', async (req: Request, res: Response) => {
    const image = String(req.params.imageName)

    const result = await imageController.getByImageName(image)
    if (result != undefined) {
        return res.status(200).send(result)
    }
    return res.status(400).send('"Error": "Image not found"')
})

imageRouter.get('/id/:id', async (req: Request, res: Response) => {
    // get router by image name
    const id = String(req.params.id)

    const result = await imageController.getById(id)
    if (result != undefined) {
        return res.status(200).send(result)
    }
    return res.status(400).send('"Error": "Image not found"')
})

imageRouter.put('/id/:id', async (req: Request, res: Response) => {
    // update image by image id
    const id = String(req.params.id)
    const payload:UpdateImageDTO = req.body

    //this should be a bool
    const result = await imageController.update(id, payload)
    return res.status(201).send(result)
})

imageRouter.delete('/id/:id', async (req: Request, res: Response) => {
    //delete image by id
    const id = String(req.params.id)

    const result = await imageController.deleteById(id)
    return res.status(204).send({
        success: result
    })
})

imageRouter.post('/', async (req: Request, res: Response) => {
    const [, authorID] = await getUserToken(req)
    //create image
    if (authorID != undefined){
        const payload:CreateImageDTO = {
            name: req.body.name,
            hyperlink: req.body.hyperlink,
            description: req.body.description,
            scriptsUsing: 0,
            reports: 0,
            authorID: authorID
        }
        const result = await imageController.create(payload)
        if (result != undefined) {
            let imageSet = await scrapeImage(result.name)
            if (imageSet == false){
                return res.status(500).send('"Error": "Server error occured creating image"')
            }
            return res.status(200).send(result)
        }
        return res.status(400).send('"Error": "Image not created"')
    }
    return res.status(401).send('"Error": "User not logged in. Unable to create new compose entry"')
})
/*
imageRouter.put('/blob/:id', async (req: Request, res: Response) => {
    const payload = new BlobObject('image', req.params.id, req.body.size, req.body.buffer)
    const uploadStatus = payload.upload()

    return(uploadStatus ? res.status(201) : res.status(500))
})

imageRouter.post('/blob/:id', async (req: Request, res: Response) => {
    const payload = new BlobObject('image', req.params.id, req.body.size, req.body.buffer)
    const uploadStatus = payload.upload()
    return(uploadStatus ? res.status(200) : res.status(500))
})
*/
imageRouter.get('/paginate/:page', async (req: Request, res: Response) => {
    //get paginated images by amount of composes/manifests
    const page: number = parseInt(req.params.page)
    if (!Number.isNaN(page)){
        const pageImages = await imageController.paginateNameOnly(page)
        if (pageImages != undefined){
            return res.status(200).json(pageImages)
        }
        return res.status(400).send('"Error": "Result undefined"')
    }
    return res.status(400).send(`"Error": "Paginate requires page parameter to be a number, '${req.params.page}' provided"`)
})

imageRouter.get('/count', async(req: Request, res: Response) => {
    let count = await imageController.getCount()
    return res.status(200).json(count)
})

export default imageRouter