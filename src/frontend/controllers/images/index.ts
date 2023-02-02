import {Request, Response } from 'express'
import {getUserToken, interpolationObject} from '../common'

type imagesInterpolationObject = interpolationObject

let imagesInterpolation: imagesInterpolationObject = {
    page: "Images",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Images {
    public static async index (req: Request, res: Response): Promise<void> {
        [imagesInterpolation.usernameToken, imagesInterpolation.userIDToken] = await getUserToken(req)
        return res.render('images/index.pug', imagesInterpolation)
    }
}

export default Images