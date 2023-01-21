import { Router, Request, Response } from 'express'
import { BlobObject } from '../../db/blob/models'
import * as imageController from '../controllers/image'
import { CreateImageDTO, UpdateImageDTO } from '../dto/image.dto'

const imageRouter = Router()

imageRouter.get('/name/:imageName', async (req: Request, res: Response) => {
    // get router by image name
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
    //create image
    const payload:CreateImageDTO = {
        name: req.body.name,
        hyperlink: req.body.hyperlink,
        scriptsUsing: 0
    }
    //randpix? - try to get elsewhere first.
    const result = await imageController.create(payload)
    if (result != undefined) {
        return res.status(200).send(result)
    }
    return res.status(400).send('"Error": "Image not created"')
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