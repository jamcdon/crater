import {Request, Response } from 'express'
import { IImageStr, IImage } from '../../../db/nosql/models/Image'
import {getUserToken, interpolationObject} from '../common'
import { getByImageName, paginate } from '../../../api/controllers/image'
import * as mapper from '../../../api/controllers/image/mapper'

type imagesInterpolationObject = interpolationObject & {
    images?: Array<IImageStr>,
    image?: IImage
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
        const image = await getByImageName(req.params.imageName)
        if (image != undefined){
            imagesInterpolation.image = image
            return res.render('images/view.pug', imagesInterpolation)
        }
        return res.status(404).render('error/404.pug', imagesInterpolation)
    }
}

export default Images