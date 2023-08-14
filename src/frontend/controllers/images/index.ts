import {Request, Response } from 'express'
import { IImageStr, IImage } from '../../../db/nosql/models/Image'
import {getUserToken, interpolationObject} from '../common'
import { getByImageName, paginate, fuzzySearch } from '../../../api/controllers/image'
import * as mapper from '../../../api/controllers/image/mapper'
import { ComposeModification } from '../../../db/nosql/models/Compose'
import { paginateScriptsById } from '../../../api/controllers/compose'
import * as composeMapper from '../../../api/controllers/compose/mapper'

const minioImageImageDefault = process.env.MINIO_IMAGE_IMAGE_DEFAULT as string;

type imagesInterpolationObject = interpolationObject & {
    images?: Array<IImageStr>
    image?: IImage
    scripts?: Array<ComposeModification>
    imageImageDefault?: string
}

let imagesInterpolation: imagesInterpolationObject = {
    page: "Images",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Images {
    public static async index (req: Request, res: Response): Promise<void> {
        [imagesInterpolation.usernameToken, imagesInterpolation.userIDToken, imagesInterpolation.isAdmin] = await getUserToken(req)
        let imagesRaw = await paginate(1)
        if (imagesRaw != undefined){
            imagesInterpolation.images = mapper.toImages(imagesRaw)
        }
        return res.render('images/index.pug', imagesInterpolation)
    }

    public static async view (req: Request, res: Response): Promise<void> {
        [imagesInterpolation.usernameToken, imagesInterpolation.userIDToken, imagesInterpolation.isAdmin] = await getUserToken(req)
        let imageName = req.params.imageName
        imageName = imageName.replace(/\+/g, " ")
        imageName = imageName.replace(/-/g, "/")

        const image = await getByImageName(imageName)
        if (image != undefined){
            image.description = image.description.replace('\"', '"').replace(/[\r\n]+/g, ' ')
            imagesInterpolation.image = image
            let imageScripts = await paginateScriptsById(image._id.toString(), 1)
            if (imageScripts != undefined){
                imagesInterpolation.scripts = await composeMapper.toComposeModifications(imageScripts)
            }
            return res.render('images/view.pug', imagesInterpolation)
        }
        return res.status(404).render('error/404.pug', imagesInterpolation)
    }

    public static async new (req: Request, res: Response): Promise<void> {
        [imagesInterpolation.usernameToken, imagesInterpolation.userIDToken, imagesInterpolation.isAdmin] = await getUserToken(req)
        imagesInterpolation.imageImageDefault = minioImageImageDefault
        return res.render('images/new.pug', imagesInterpolation)
    }

    public static async search(req: Request, res: Response): Promise<void> {
        [imagesInterpolation.usernameToken, imagesInterpolation.userIDToken, imagesInterpolation.isAdmin] = await getUserToken(req)
        const query = req.params.query.replace(/\+/g, " ").replace(/-/g, "/")

        let page = parseInt(req.params.page)
        if (!Number.isNaN(page)){
            page = 1
        }

        let imagesRaw = await fuzzySearch(query, page)
        if (imagesRaw != undefined){
            imagesInterpolation.images = mapper.toImages(imagesRaw)
        }

        return res.render('images/search.pug', imagesInterpolation)
    }
}

export default Images